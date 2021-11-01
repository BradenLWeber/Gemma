import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'

const PublicPrivateBar = (props) => {

    if (props.type === 'Private') {
        // if private is turned on
        return (
            <TouchableOpacity style={styles.publicPrivateBar} onPress={props.onClick}>
                <Text style={styles.textPrivate}>Private</Text>
                <View style={styles.privateSliderBox}>
                    <Text style={{ marginLeft: 8 }}>.  .  .  .</Text>
                </View>
            </TouchableOpacity>
        )
    } else {
        // if public is turned on
        return (
            <TouchableOpacity style={styles.publicPrivateBar} onPress={props.onClick}>
                <View style={styles.publicSliderBox}>
                    <Text style={{ marginLeft: 12 }}>.  .  .  .</Text>
                </View>
                <Text style={styles.textPublic}>Public</Text>
            </TouchableOpacity>
        )
    }
};

const styles = StyleSheet.create({
    publicPrivateBar: {
        flexDirection: 'row',
        alignSelf: 'flex-start',
        position: 'absolute',
        top: 90,
        width: 140,
        height: 40,
        marginLeft: 20,
        backgroundColor: '#F9D01E',
        borderRadius: 20,
        elevation: 8,
        marginTop: 5,
    },
    textPrivate: {
        paddingTop: 8,
        paddingLeft: 11,
        fontSize: 18,
        color: 'gray',
    },
    textPublic: {
        paddingTop: 8,
        paddingLeft: 5,
        fontSize: 18,
        color: 'gray',
    },
    privateSliderBox: {
        backgroundColor: 'white',
        borderColor: 'gray',
        borderWidth: 1.5,
        height: 30,
        width: 62,
        marginLeft: 5,
        marginTop: 5,
        borderBottomRightRadius: 15,
        borderTopRightRadius: 15,
    },
    publicSliderBox: {
        backgroundColor: 'white',
        borderColor: 'gray',
        borderWidth: 1.5,
        height: 30,
        width: 68,
        marginLeft: 5,
        marginTop: 5,
        borderBottomLeftRadius: 15,
        borderTopLeftRadius: 15,
    },
});

export default PublicPrivateBar;