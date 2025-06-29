// External libraries
import MaskInput from 'react-native-mask-input';
import styled from 'styled-components/native';

export const Container = styled(MaskInput)`
  width: 100%;
  height: 50px;
  padding: 10px;
  border-radius: 4px;

  color: ${({ theme }) => theme.text};
  background-color: ${({ theme }) => theme.backgroundItem};
`;
