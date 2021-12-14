import React from 'react';
import { ImageBackground, Text, View} from 'react-native';
import { globalStyles } from '../styles/global';

{/* The board screen displays an image with our online user help for the boards screen on it. 
    We communicate our help through graphic and written instruction.
*/}

export default function AboutBoardScreen({ route, navigation }) {
    return (
        <View style={globalStyles.helpScreenView}>
            <ImageBackground source={require('../assets/HelpScreen_board.png')} 
            style={globalStyles.wallpaper}
            resizeMode='contain'></ImageBackground>
        </View>
    );
  }