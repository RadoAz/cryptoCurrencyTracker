import React, {FC} from 'react';
import {View, Text, ActivityIndicator} from 'react-native';
import styles from './LoadingComponent.styles';

const LoadingComponent: FC = () => {
  return (
    <View style={styles.container} testID="loading-component">
      <View style={styles.overlay} />
      <ActivityIndicator
        size="large"
        color="#0000ff"
        style={styles.activityIndicator}
      />
      <Text style={styles.loadingText}>Loading</Text>
    </View>
  );
};

export default LoadingComponent;
