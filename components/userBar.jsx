import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, KeyboardAvoidingView, TextInput } from 'react-native'

const UserBar = (props) => {
    const [hover, setHover] = useState(false);

    return (
        <View style={styles.userBar}>
        <>
            {/*User icon*/}
            <View style={styles.userIcon}>
                {/* user image */}
            </View>
            {/*Search for pins input*/}
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={styles.userInput}
            >
                <TextInput style={styles.input} placeholder={'Search for a pin...'}>

                </TextInput>
            </KeyboardAvoidingView>
            {/*Options icon*/}
            <TouchableOpacity
                style={[styles.userOptions, hover ? styles.userOptionsHover : {}]}
                onMouseEnter={() => setHover(true)}
                onMouseLeave={() => setHover(false)}
                onPress={() => setHover(hover ? false : true)}
            >
                <Text style={styles.userOptionsText}>- - -</Text>
            </TouchableOpacity>
        </>
        </View>
    )
}

const styles = StyleSheet.create({
    userBar: {
        width: '90%',
        height: 60,
        borderRadius: 30,
        backgroundColor: '#BCBCBC',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        elevation: 20,
},
    userIcon: {
        width: 46,
        height: 46,
        borderRadius: 23,
        backgroundColor: '#D4D8E5',
        borderColor: '#393B48',
        borderWidth: 2,
        margin: 7,
    },
    userInput: {
        flex: 1,
        height: 40,
    },
    input: {
        flex: 1,
        borderRadius: 10,
        backgroundColor: '#FFFFFF',
        paddingLeft: 10,
        paddingRight: 10,
        borderColor: 'black',
        borderWidth: 1,
        fontSize: 20,
    },
    userOptions: {
        width: 46,
        height: 46,
        borderRadius: 23,
        margin: 7,
        alignItems: 'center',
        justifyContent: 'center',
    },
    userOptionsHover: {
        backgroundColor: '#D4D8E5',
    },
    userOptionsText: {
        color: 'black',
        fontSize: 16,
    }
});

export default UserBar;