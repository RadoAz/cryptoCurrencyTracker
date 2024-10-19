import React, {FC, ReactNode} from 'react';
import {View, Text} from 'react-native';
import styles from './DetailsBlock.styles';

type DetailsBlockProps = {
  title: string;
  children: ReactNode;
};

const DetailsBlock: FC<DetailsBlockProps> = ({title, children}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <View>{children}</View>
    </View>
  );
};

export default DetailsBlock;
