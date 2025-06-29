import React, { useCallback, useState } from 'react';
import { api } from '../../services/api';
import moment from 'moment';
import { Dimensions } from 'react-native';
import {
  CenteredText,
  Container,
  HighlightBox,
  HighlightText,
  StyledLineChart,
  Title,
} from './styles';
import { useTheme } from 'styled-components/native';
import { useFocusEffect } from '@react-navigation/native';

const screenWidth = Dimensions.get('window').width;

type DailyStat = { date: string; total: number };
type Top = {
  avgSale: number;
  id: number;
  name: string;
  totalSales: number;
  uniqueDays: number;
};
interface ClientStat {
  topAvg: Top;
  topFreq: Top;
  topVolume: Top;
}

const HomeScreen = () => {
  const theme = useTheme();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [dailyStats, setDailyStats] = useState<DailyStat[]>([]);
  const [clientStats, setClientStats] = useState<ClientStat>();

  const fetchData = async () => {
    try {
      const [dailyRes, clientRes] = await Promise.all([
        api.get('/stats/daily'),
        api.get('/stats/clients'),
      ]);
      setDailyStats(dailyRes.data || []);
      setClientStats(clientRes.data || []);
    } catch (err) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchData();
    }, []),
  );

  if (loading) return <CenteredText>Carregando...</CenteredText>;
  if (error) return <CenteredText>Erro ao carregar estatísticas.</CenteredText>;

  return (
    <Container>
      <Title>📊 Gráfico de Vendas Diárias</Title>

      {dailyStats.length > 0 && (
        <StyledLineChart
          data={{
            labels: dailyStats.map(item => moment(item.date).format('DD/MM')),
            datasets: [{ data: dailyStats.map(item => item.total) }],
          }}
          width={screenWidth - 32}
          height={280}
          yAxisLabel="R$"
          yAxisSuffix=""
          chartConfig={{
            backgroundColor: theme.background,
            backgroundGradientFrom: theme.background,
            backgroundGradientTo: theme.background,
            decimalPlaces: 0,
            color: () => theme.text,
            labelColor: () => '#000',
            propsForDots: {
              r: '4',
              strokeWidth: '2',
              stroke: theme.primaryBlue,
            },
          }}
        />
      )}

      <Title>🏅 Destaques</Title>
      <HighlightBox>
        <HighlightText>
          📦 Maior volume: {clientStats?.topVolume.name} - R${' '}
          {clientStats?.topVolume.totalSales}
        </HighlightText>
        <HighlightText>
          📐 Maior média: {clientStats?.topAvg.name} - R${' '}
          {clientStats?.topAvg.avgSale.toFixed(2)}
        </HighlightText>
        <HighlightText>
          🔁 Mais frequente: {clientStats?.topFreq.name} -{' '}
          {clientStats?.topFreq.uniqueDays} compras
        </HighlightText>
      </HighlightBox>
    </Container>
  );
};

export default HomeScreen;
