import React, {FC} from 'react';
import {View} from 'react-native';
import CryptoCurrenciesList from '../../components/CryptoCurrenciesList/CryptoCurrenciesList';
import SearchField from '../../components/SearchField/SearchField';
import {useDashboardData} from '../../hooks/useDashboardData';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../navigation/navigationTypes';
import styles from './DashboardScreen.styles';
import LoadingComponent from '../../components/LoadingComponent/LoadingComponent';
import ErrorComponent from '../../components/ErrorComponent/ErrorComponent';

type DashboardScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'DashboardScreen'
>;

const DashboardScreen: FC<DashboardScreenProps> = ({navigation}) => {
  const {
    searchQuery,
    setSearchQuery,
    cryptos,
    isLoading,
    error,
    fetchNextPage,
    hasNextPage,
    refetch,
  } = useDashboardData();
  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  if (error) {
    return <ErrorComponent error={error} />;
  }

  return (
    <View style={styles.container}>
      <SearchField value={searchQuery} onSearch={handleSearch} />
      {isLoading && <LoadingComponent />}
      <CryptoCurrenciesList
        cryptos={cryptos}
        onItemPress={id => navigation.navigate('Details', {id})}
        onEndReached={() => {
          if (hasNextPage) {
            fetchNextPage();
          }
        }}
        onRefresh={refetch}
      />
    </View>
  );
};

export default DashboardScreen;
