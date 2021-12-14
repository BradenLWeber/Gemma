import React from 'react';
import { ImageBackground, Text, View } from 'react-native';
import { globalStyles } from '../styles/global';

{/* The mapHelp screen displays an image with our online user help for the map screen on it. 
    We communicate our help through graphic and written instruction.
*/}

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