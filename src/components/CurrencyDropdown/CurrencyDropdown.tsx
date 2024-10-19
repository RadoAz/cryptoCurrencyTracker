import React, {FC} from 'react';
import {View} from 'react-native';
import {SelectList} from 'react-native-dropdown-select-list';
import {PriceItem} from '../../types';
import styles from './CurrencyDropdown.styles';

interface CurrencyDropdownProps {
  data: PriceItem[];
  selected: string;
  onSelect: (item: string) => void;
}

const CurrencyDropdown: FC<CurrencyDropdownProps> = ({
  data,
  selected,
  onSelect,
}) => {
  const items = data.map(({currency}) => ({
    key: currency,
    value: currency.toUpperCase(),
  }));

  return (
    <View style={styles.container}>
      <SelectList
        setSelected={onSelect}
        data={items}
        defaultOption={{
          key: selected,
          value: selected.toUpperCase(),
        }}
      />
    </View>
  );
};

export default CurrencyDropdown;
