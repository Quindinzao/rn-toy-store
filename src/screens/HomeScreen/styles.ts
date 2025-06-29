import { LineChart } from 'react-native-chart-kit';
import styled from 'styled-components/native';

export const Container = styled.ScrollView`
  padding: 0 16px;
  background-color: #fff;
`;

export const CenteredText = styled.Text`
  padding: 16px;
  text-align: center;
`;

export const Title = styled.Text`
  margin-top: 12px;
  margin-bottom: 12px;
  font-size: 20px;
  font-weight: 600;
  color: ${({ theme }) => theme.text};
`;

export const HighlightBox = styled.View`
  background-color: #f5f5f5;
  padding: 12px;
  border-radius: 8px;
  margin-bottom: 20px;
`;

export const HighlightText = styled.Text`
  margin-bottom: 4px;
`;

export const StyledLineChart = styled(LineChart)`
  margin: 16px 0;
  border-radius: 8px;
  align-self: center;
`;
