import styled from 'styled-components/native';

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
