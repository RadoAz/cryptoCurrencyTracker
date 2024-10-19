import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 100,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    backdropFilter: 'blur(5px)',
  },
  activityIndicator: {
    marginBottom: 10,
  },
  loadingText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
  },
});
