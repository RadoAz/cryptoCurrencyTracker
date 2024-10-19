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
  textContainer: {
    width: '80%',
  },
  errorText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: 10,
  },
  errorCode: {
    fontSize: 16,
    color: '#ffffff',
    textAlign: 'center',
  },
  restartBtn: {
    paddingVertical: 10,
    paddingHorizontal: 24,
    backgroundColor: '#c10000',
    marginTop: 30,
  },
  restartBtnText: {
    color: '#fff',
    textAlign: 'center',
  },
});
