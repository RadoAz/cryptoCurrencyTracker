import React, {FC} from 'react';
import {View, Text} from 'react-native';
import styles from './PriceItem.styles';

interface PriceItemProps {
  data: {currency: string; value: number};
}

const PriceItem: FC<PriceItemProps> = ({data}) => {
  return (
    <View style={styles.container}>
      <Text>{data.currency.toUpperCase()}</Text>
      <Text>{data.value}</Text>
    </View>
  );
};

export default PriceItem;
