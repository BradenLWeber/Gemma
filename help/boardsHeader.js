import React from 'react';
import { TouchableOpacity, View, Text } from 'react-native';

import { globalStyles } from '../styles/global';

{/* The BoardsHeader goes at the top of the Boards screen. 
    It displays an 'i' that, when clicked, navigates to the boards help screen.
*/}

export default function BoardsHeader({ navigation }) {
    return (
        <View>
            <TouchableOpacity onPress={() => navigation.navigate('About Boards')}>
                <View style={globalStyles.infoWrapper}>
                    <Text style={globalStyles.about}>i</Text>
                </View>
            </TouchableOpacity>
        </View>
    );
};