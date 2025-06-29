import styled from 'styled-components/native';

export const StyledText = styled.Text`
  font-size: 16px;
  font-weight: 500;
  color: ${({ theme }) => theme.text};
`;
