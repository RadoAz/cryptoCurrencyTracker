import React, {useState, FC} from 'react';
import {Text, ScrollView} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import CurrencyDropdown from '../../components/CurrencyDropdown/CurrencyDropdown';
import DetailsBlock from '../../components/DetailsBlock/DetailsBlock';
import CryptoPriceChart from '../../components/CryptoPriceChart/CryptoPriceChart';
import styles from './CryptoDetailsScreen.styles';
import useMarketData from '../../hooks/useMarketData';
import {RootStackParamList} from '../../navigation/navigationTypes';
import LoadingComponent from '../../components/LoadingComponent/LoadingComponent';
import ErrorComponent from '../../components/ErrorComponent/ErrorComponent';

type DetailsScreenProps = NativeStackScreenProps<RootStackParamList, 'Details'>;

const CryptoDetailsScreen: FC<DetailsScreenProps> = ({route}) => {
  const [selectedCurrency, setSelectedCurrency] = useState('usd');
  const {id} = route.params;
  const {
    details,
    error,
    isLoading,
    pricesArray,
    price,
    tradingVolume,
    ATH,
    ATL,
  } = useMarketData(id, selectedCurrency);

  if (isLoading) {
    return <LoadingComponent />;
  }
  if (error) {
    return <ErrorComponent error={error} />;
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>{details?.name}</Text>
      <DetailsBlock title="Select Currency">
        <CurrencyDropdown
          data={pricesArray || []}
          selected={selectedCurrency}
          onSelect={setSelectedCurrency}
        />
      </DetailsBlock>
      <DetailsBlock title="Current Price">
        <Text>{`${price} ${selectedCurrency.toUpperCase()}`}</Text>
      </DetailsBlock>
      <DetailsBlock title="Market cap">
        <Text>{details?.market_cap_rank}</Text>
      </DetailsBlock>
      <DetailsBlock title="24-hour trading volume">
        <Text>{`${tradingVolume} ${selectedCurrency.toUpperCase()}`}</Text>
      </DetailsBlock>
      <DetailsBlock title="Circulating supply">
        <Text>{details?.market_data?.circulating_supply}</Text>
      </DetailsBlock>
      <DetailsBlock title="Total supply">
        <Text>{details?.market_data?.total_supply}</Text>
      </DetailsBlock>
      <DetailsBlock title="All-time high price">
        <Text>{`${ATH} ${selectedCurrency.toUpperCase()}`}</Text>
      </DetailsBlock>
      <DetailsBlock title="All-time low price">
        <Text>{`${ATL} ${selectedCurrency.toUpperCase()}`}</Text>
      </DetailsBlock>
      <DetailsBlock title="Price chart (last 30 days)">
        <CryptoPriceChart
          coinId={details?.id || ''}
          currency={selectedCurrency}
        />
      </DetailsBlock>
    </ScrollView>
  );
};

export default CryptoDetailsScreen;
