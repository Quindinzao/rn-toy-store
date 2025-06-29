import React, { useState } from 'react';
import { Alert } from 'react-native';
import moment from 'moment';
import { api } from '../../services/api';
import { Container, StyledButton, StyledText, StyledTextInput } from './styles';
import { useNavigation } from '@react-navigation/native';
import { propsSaleCreateStack } from '../../interfaces/RoutesProps';
import { Masks } from 'react-native-mask-input';

const SaleCreateScreen: React.FC<propsSaleCreateStack> = ({ route }) => {
  const navigation = useNavigation();
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState('');
  const clientId = route.params.email;

  const handleBack = () => navigation.goBack();

  const handleCreateSale = async () => {
    if (!clientId || !amount || !date) {
      Alert.alert('Erro', 'Todos os dados obrigatórios devem ser fornecidos.');
      return;
    }

    const parsedDate = moment(date, ['DD/MM/YYYY', 'YYYY-MM-DD'], true);
    if (!parsedDate.isValid()) {
      Alert.alert('Erro', 'Data inválida. Use o formato DD/MM/AAAA.');
      return;
    }

    try {
      await api.post('/sales', {
        clientId,
        value: parseFloat(amount),
        date: parsedDate.format('YYYY-MM-DD'),
      });
      Alert.alert('Sucesso', 'Venda registrada!');
      navigation.goBack();
    } catch (error) {
      throw error;
    }
  };

  return (
    <Container>
      <StyledText>Registrar Venda</StyledText>
      <StyledTextInput
        placeholder="Valor da venda"
        value={amount}
        onChangeText={setAmount}
        keyboardType="decimal-pad"
      />
      <StyledTextInput
        placeholder="Data da compra (DD/MM/AAAA)"
        value={date}
        onChangeText={setDate}
        keyboardType="decimal-pad"
        mask={Masks.DATE_DDMMYYYY}
      />
      <StyledButton title="Confirmar Venda" onPress={handleCreateSale} />
      <StyledButton title="Voltar" onPress={handleBack} />
    </Container>
  );
};

export default SaleCreateScreen;
