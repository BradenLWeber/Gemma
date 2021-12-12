import React from 'react';
import { TouchableOpacity, View, Text } from 'react-native';

import { globalStyles } from '../styles/global';

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