/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useState } from 'react';
import { FlatList } from 'react-native';
import { Container, StyledText } from './styles';
import { api } from '../../services/api';
import ListEmptyComponent from '../../components/ListEmptyComponent';
import Button from '../../components/Button';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { propsStack } from '../../interfaces/RoutesProps';
import { ClientResponseProps } from '../../interfaces/ClientResponseProps';
import moment from 'moment';
import Card from '../../components/Card';

const ClientScreen: React.FC = () => {
  const navigation = useNavigation<propsStack>();
  const [clients, setClients] = useState<ClientResponseProps[]>([]);

  const handleGoToNewClient = () => navigation.navigate('ClientCreate');

  const getMissingAlphabetLetter = (name: string) => {
    const alphabet = 'abcdefghijklmnopqrstuvwxyz';
    const nameLetters = new Set(name.toLowerCase());
    for (let i = 0; i < alphabet.length; i++) {
      if (!nameLetters.has(alphabet[i])) {
        return alphabet[i].toUpperCase();
      }
    }
    return '-';
  };

  const normalizeClients = (data: any[]) => {
    return data.map(client => ({
      name:
        client.info?.nomeCompleto ||
        client.duplicado?.nomeCompleto ||
        'Sem nome',
      email: client.info?.detalhes?.email || 'Sem email',
      birthDate: client.info?.detalhes?.nascimento || 'Sem data',
      sales: client.estatisticas?.vendas || [],
    }));
  };

  const fetchClients = async () => {
    try {
      const res = await api.get('/clients');
      const rawClients = res.data?.data?.clientes || [];
      const normalized = normalizeClients(rawClients);
      setClients(normalized);
    } catch (err) {
      throw err;
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchClients();
    }, []),
  );

  return (
    <Container>
      <FlatList
        data={clients}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item: any) => String(item.email)}
        renderItem={({ item }: any) => (
          <Card
            key={item.email}
            name={item.name}
            email={item.email}
            birthDate={moment(item.birthDate).format('DD/MM/YYYY')}
            sales={item.sales.length}
            firstCharacter={getMissingAlphabetLetter(item.name)}
          />
        )}
        ListEmptyComponent={<ListEmptyComponent />}
        ListHeaderComponent={<StyledText>Clientes</StyledText>}
      />
      <Button title="Cadastrar cliente" onPress={handleGoToNewClient} />
    </Container>
  );
};

export default ClientScreen;
