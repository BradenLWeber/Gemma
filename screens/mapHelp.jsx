import React from 'react';
import { ImageBackground, Text, View } from 'react-native';
import { globalStyles } from '../styles/global';

export default function AboutMapScreen({ route, navigation }) {

    return (
        <View style={globalStyles.helpScreenView}>
            <ImageBackground source={require('../assets/HelpScreen_pin.png')} 
            style={globalStyles.wallpaper}
            resizeMode='contain'>
            </ImageBackground>
        </View>
    );
  }