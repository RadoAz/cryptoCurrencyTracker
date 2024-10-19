import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    padding: 20,
    width: '100%',
    borderRadius: 12,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  title: {
    fontSize: 18,
    fontWeight: '900',
    color: '#272727',
    marginBottom: 5,
  },
  field: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 5,
    borderBottomWidth: 1,
  },
  fieldTitle: {
    fontWeight: '900',
  },
  fieldValue: {},
  positive: {
    color: 'green',
  },
  negative: {
    color: 'red',
  },
  favoriteBtn: {
    position: 'absolute',
    top: 18,
    right: 18,
    zIndex: 2,
  },
});
