import { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigation } from '@react-navigation/native';
import { propsStack } from '../../interfaces/RoutesProps';
import { Container, StyledButton, StyledLogo, StyledTextInput } from './styles';
import { Alert } from 'react-native';

const LoginScreen: React.FC = () => {
  const navigation = useNavigation<propsStack>();
  const { signIn } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const handleGoToRegister = () => navigation.navigate('Register');

  const handleLogin = async () => {
    if (!username || !password) {
      Alert.alert('Erro', 'Preencha todos os campos.');
      return;
    }
    try {
      await signIn(username, password);
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
        autoCapitalize="none"
      />
      <StyledTextInput
        placeholder="Senha"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <StyledButton title="Entrar" onPress={handleLogin} />
      <StyledButton
        title="Ir para a tela de registro"
        onPress={handleGoToRegister}
      />
    </Container>
  );
};

export default LoginScreen;
