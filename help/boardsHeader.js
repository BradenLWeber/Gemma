import React from 'react';
import { TouchableOpacity, View, Text } from 'react-native';

import { globalStyles } from '../styles/global';

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