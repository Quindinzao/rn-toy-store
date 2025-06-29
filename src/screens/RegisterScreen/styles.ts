import styled from 'styled-components/native';
import TextField from '../../components/TextField';
import Logo from '../../assets/icons/Logo';
import Button from '../../components/Button';

export const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  padding: 18px;
  background-color: ${({ theme }) => theme.background};
`;

export const StyledLogo = styled(Logo)`
  margin-bottom: 12px;
`;

export const StyledTextInput = styled(TextField)`
  margin-bottom: 12px;
`;

export const StyledButton = styled(Button)`
  margin-bottom: 12px;
`;
