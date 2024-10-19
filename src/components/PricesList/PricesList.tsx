import React, {FC} from 'react';
import {FlatList} from 'react-native';
import PriceItem from '../PriceItem/PriceItem';

type PricesListProps = {
  data: {currency: string; value: number}[];
};

const PricesList: FC<PricesListProps> = ({data}) => {
  return (
    <FlatList
      data={data}
      renderItem={({item}) => <PriceItem data={item} />}
      keyExtractor={item => item.currency}
    />
  );
};

export default PricesList;
