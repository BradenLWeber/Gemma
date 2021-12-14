import React from 'react';
import { TouchableOpacity, View, Text } from 'react-native';

import { globalStyles } from '../styles/global';

{/* The MapHeader goes at the top of the Map screen. 
    It displays an 'i' that, when clicked, navigates to the map/pins help screen.
*/}

export default function MapHeader({ navigation }) {
    return (
        <View>
            <TouchableOpacity onPress={() => navigation.navigate('About Map')}>
                <View style={globalStyles.infoWrapper}>
                    <Text style={globalStyles.about}>i</Text>
                </View>
            </TouchableOpacity>
        </View>
    );
};