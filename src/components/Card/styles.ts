import styled from 'styled-components/native';
import Button from '../Button';

export const Container = styled.View`
  width: 100%;
  padding: 12px 24px;
  margin-top: 8px;
  margin-bottom: 8px;
  justify-content: center;
  border-radius: 12px;

  background-color: ${({ theme }) => theme.backgroundItem};
`;

export const Row = styled.View`
  width: 100%;
  margin-top: 4px;
  margin-bottom: 4px;
  flex-direction: row;
`;

export const StyledTitle = styled.Text`
  font-size: 16px;
  font-weight: 600;
  color: ${({ theme }) => theme.text};
`;

export const StyledText = styled.Text`
  font-size: 16px;
  font-weight: 300;
  color: ${({ theme }) => theme.text};
`;

export const StyledButtonText = styled.Text`
  width: 100%;
  padding: 8px;
  text-align: center;
  background-color: transparent;

  font-size: 16px;
  font-weight: 400;
  color: ${({ theme }) => theme.primaryBlue};
`;

export const StyledButton = styled(Button)`
  margin-bottom: 12px;
`;
