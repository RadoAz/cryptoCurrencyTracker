import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import RNRestart from 'react-native-restart';
import styles from './ErrorComponent.styles';

interface ErrorComponentProps {
  error: {
    message: string;
  };
}

const ErrorComponent: React.FC<ErrorComponentProps> = ({error}) => {
  return (
    <View style={styles.container} testID="error-component">
      <View style={styles.overlay} />
      <View style={styles.textContainer}>
        <Text style={styles.errorText}>
          Oops... Unable to fetch details, please try again later.
        </Text>
        <Text style={styles.errorCode}>Error code: {error.message}</Text>
        <TouchableOpacity
          style={styles.restartBtn}
          onPress={() => RNRestart.restart()}>
          <Text style={styles.restartBtnText}>Restart app</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ErrorComponent;
