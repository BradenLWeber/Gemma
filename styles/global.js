import {StyleSheet} from 'react-native';

export const globalStyles = StyleSheet.create({
    addWrapper: {
        width: 50,
        height: 50,
        backgroundColor: '#FFF',
        borderRadius: 25,
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
      bottom: 15,
      right: 15,
    },
  });