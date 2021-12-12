import {Dimensions, StyleSheet, Font} from 'react-native';

{/* global.js stores some common styles used throughout the app. */}

export const globalStyles = StyleSheet.create({
  about: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#201E3C',
  },
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
    helpScreenView: {
      flexDirection: 'column',
      alignItems: 'center',
    },
    infoWrapper: {
      width: 30,
        height: 30,
        backgroundColor: '#FFF',
        borderRadius: 40,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1.5,
        borderColor: '#201E3C',
    },
    PinButton: {
      position: 'absolute',
      bottom: 15,
      right: 15,
    },
    wallpaper: {
      alignItems: 'center',
      width: '100%',
      height: '100%',
  }
  });