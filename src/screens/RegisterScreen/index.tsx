import { useState } from 'react';
import { Alert } from 'react-native';
import { api } from '../../services/api';
import { Container, StyledButton, StyledLogo, StyledTextInput } from './styles';
import { useNavigation } from '@react-navigation/native';
import { propsStack } from '../../interfaces/RoutesProps';

const RegisterScreen: React.FC = () => {
  const navigation = useNavigation<propsStack>();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleBack = () => navigation.goBack();

  const handleRegister = async () => {
    if (!username || !password) {
      Alert.alert('Erro', 'Preencha todos os campos.');
      return;
    }
    try {
      const response = await api.post('/auth/register', {
        username,
        password,
      });
      if (response.status === 201) {
        Alert.alert('Sucesso', 'Cadastro realizado com sucesso!');
        navigation.navigate('Login');
      }
    } catch (error) {
      throw error;
    }
  };

  return (
    <Container>
      <StyledLogo />
      <StyledTextInput
        placeholder="Nome de usuário"
        value={username}
        onChangeText={setUsername}
      />
      <StyledTextInput
        placeholder="Senha"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <StyledButton title="Registrar" onPress={handleRegister} />
      <StyledButton title="Ir para a tela de login" onPress={handleBack} />
    </Container>
  );
};

export default RegisterScreen;
