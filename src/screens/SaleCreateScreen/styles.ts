import styled from 'styled-components/native';
import TextField from '../../components/TextField';
import Button from '../../components/Button';

export const Container = styled.View`
  flex: 1;
  justify-content: center;
  padding: 18px;
  background-color: ${({ theme }) => theme.background};
`;

export const StyledText = styled.Text`
  margin-bottom: 12px;
  font-size: 20px;
  font-weight: 600;
  color: ${({ theme }) => theme.text};
`;

export const StyledTextInput = styled(TextField)`
  margin-bottom: 12px;
`;

export const StyledButton = styled(Button)`
  margin-bottom: 12px;
`;
