import React, { useState } from 'react';
import { Alert } from 'react-native';
import { Container, StyledButton, StyledText, StyledTextInput } from './styles';
import { api } from '../../services/api';
import { useNavigation } from '@react-navigation/native';
import moment from 'moment';
import { Masks } from 'react-native-mask-input';

const ClientCreateScreen = () => {
  const navigation = useNavigation();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const handleBack = () => navigation.goBack();

  const handleCreate = async () => {
    if (!name || !email || !birthDate) {
      Alert.alert('Erro', 'Preencha todos os campos.');
      return;
    }

    const parsedDate = moment(birthDate, ['DD/MM/YYYY', 'YYYY-MM-DD'], true);
    if (!parsedDate.isValid()) {
      Alert.alert(
        'Erro',
        'Data de nascimento inválida. Use o formato DD/MM/AAAA.',
      );
      return;
    }

    try {
      await api.post('/clients', {
        name,
        email,
        birthDate: parsedDate.format('YYYY-MM-DD'),
      });
      Alert.alert('Sucesso', 'Cliente criado!');
      navigation.goBack();
    } catch (err: any) {
      throw err;
    }
  };

  return (
    <Container>
      <StyledText>Novo cliente</StyledText>
      <StyledTextInput
        placeholder="Nome"
        value={name}
        onChangeText={setName}
        autoCapitalize="words"
      />
      <StyledTextInput
        placeholder="E-mail"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <StyledTextInput
        placeholder="Nascimento (DD/MM/AAAA)"
        value={birthDate}
        onChangeText={setBirthDate}
        keyboardType="decimal-pad"
        mask={Masks.DATE_DDMMYYYY}
      />
      <StyledButton title="Criar" onPress={handleCreate} />
      <StyledButton title="Voltar" onPress={handleBack} />
    </Container>
  );
};

export default ClientCreateScreen;
