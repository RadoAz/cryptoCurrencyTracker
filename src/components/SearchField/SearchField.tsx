import React from 'react';
import {TextInput} from 'react-native';
import styles from './SearchField.styles';

type SearchFieldProps = {
  value: string;
  onSearch: (query: string) => void;
};

const SearchField: React.FC<SearchFieldProps> = ({value, onSearch}) => {
  return (
    <TextInput
      style={styles.searchContainer}
      placeholder="Search Cryptocurrencies"
      value={value}
      onChangeText={onSearch}
    />
  );
};

export default SearchField;
