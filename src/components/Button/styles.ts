// External libraries
import styled from 'styled-components/native';

export const Container = styled.TouchableOpacity`
  width: 100%;
  height: 50px;
  padding: 10px;
  align-items: center;
  justify-content: center;
  border-radius: 4px;

  background-color: ${({ theme }) => theme.primaryBlue};
`;

export const StyledText = styled.Text`
  width: 100%;
  font-size: 14px;
  font-weight: 700;
  text-transform: uppercase;
  color: ${({ theme }) => theme.background};
`;
