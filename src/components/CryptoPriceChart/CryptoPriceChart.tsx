import React, {FC, useState, useEffect} from 'react';
import {View, Text, Dimensions} from 'react-native';
import {LineChart} from 'react-native-chart-kit';
import useCryptoPriceChartData from '../../hooks/useCryptoPriceChartData';
import styles from './CryptoPriceChart.style';

interface CryptoPriceChartProps {
  coinId: string;
  currency: string;
}

interface ChartData {
  date: string;
  price: number;
}

const CryptoPriceChart: FC<CryptoPriceChartProps> = ({coinId, currency}) => {
  const [containerWidth, setContainerWidth] = useState<number>(0);
  const {data, isLoading, isError} = useCryptoPriceChartData(coinId, currency);
  const windowWidth = Dimensions.get('window').width - 72;
  useEffect(() => {
    setContainerWidth(windowWidth);
  }, [windowWidth]);

  if (isLoading) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  if (isError) {
    return (
      <View style={styles.container}>
        <Text>Error loading data</Text>
      </View>
    );
  }

  const labels = data?.map((item: ChartData) => item.date) || [];
  const prices = data?.map((item: ChartData) => item.price) || [];

  return (
    <View style={styles.container}>
      <LineChart
        data={{
          labels: labels.slice(0, 6),
          datasets: [
            {
              data: prices,
              strokeWidth: 1,
            },
          ],
        }}
        width={containerWidth}
        height={220}
        yAxisLabel=""
        yAxisSuffix=""
        yAxisInterval={1}
        chartConfig={{
          backgroundColor: '#fff',
          backgroundGradientFrom: '#1E2923',
          backgroundGradientTo: '#08130D',
          decimalPlaces: 2,
          color: (opacity = 1) => `rgba(0, 198, 241, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          style: {
            borderRadius: 0,
          },
          propsForDots: {
            r: '0',
          },
        }}
        bezier
        withDots={false}
        style={styles.chart}
      />
    </View>
  );
};

export default CryptoPriceChart;
