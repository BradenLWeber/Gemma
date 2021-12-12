import React from 'react';
import { ImageBackground, Text, View} from 'react-native';
import { globalStyles } from '../styles/global';

export default function AboutBoardScreen({ route, navigation }) {
    return (
        <View style={globalStyles.helpScreenView}>
            <ImageBackground source={require('../assets/HelpScreen_board.png')} 
            style={globalStyles.wallpaper}
            resizeMode='contain'></ImageBackground>
        </View>
    );
  }