import {StyleSheet} from 'react-native';

export const globalStyles = StyleSheet.create({
    addWrapper: {
        width: 30,
        height: 30,
        backgroundColor: '#FFF',
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1
      },

    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
    },
    
    PinButton: {
      position: 'absolute',
      bottom: 10,
      right: 10,
    },
  });