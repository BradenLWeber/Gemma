import React, { useState } from 'react';
import { Platform, Image, View, Text, StyleSheet, TouchableOpacity, KeyboardAvoidingView, TextInput } from 'react-native'

const UserBar = (props) => {
    return (
        <View style={styles.userBar}>
        <>
            {/*User icon*/}
            <TouchableOpacity style={styles.userIcon} onPress={props.pressUser}>
                <Image source={props.userPhoto} style={styles.userImage}/>
            </TouchableOpacity>
            {/*Search for pins input*/}
            <View style={styles.userInput}>
                {/* This extra view wrapper allows me to specificy the width I want the textInput */}
                <View style={styles.userInputWidth}>
                    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
                        <TextInput style={styles.input} placeholder={'Search for ' + props.searchType + '...'}/>
                    </KeyboardAvoidingView>
                </View>
                {/* Search options icon */}
                <TouchableOpacity style={styles.searchDropdown} onPress={props.pressSearchOptions}>
                    <Text style={styles.searchDropdownText}>{props.searchMenuShowing ? '\u02c6' : '\u02c7'}</Text>
                </TouchableOpacity>
            </View>
            {/*Options icon*/}
            <TouchableOpacity
                style={[styles.userOptions, props.optionsMenuShowing ? styles.userOptionsPressed : {}]}
                onPress={() => props.pressOptions()}
            >
                <Text style={styles.userOptionsText}>. . .</Text>
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
        justifyContent: 'center',
        alignItems: 'center',
    },
    userImage: {
        width: 44,
        height: 44,
        borderRadius: 22,
    },
    userInput: {
        flex: 1,
        borderRadius: 10,
        backgroundColor: '#FFFFFF',
        paddingLeft: 10,
        paddingRight: 10,
        borderColor: 'black',
        borderWidth: 1,
        fontSize: 20,
        flexDirection: 'row',
        height: 40,
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    userInputWidth: {
        flex: 1,
    },
    input: {
        fontSize: 20,
    },
    searchDropdown: {
        right: 0,
        marginLeft: 10,
    },
    searchDropdownText: {
        width: 30,
        height: 30,
        fontSize: 60,
        bottom: 6,
        color: 'gray',
        right: 0,
    },
    userOptions: {
        width: 46,
        height: 46,
        borderRadius: 23,
        margin: 7,
        alignItems: 'center',
        justifyContent: 'center',
    },
    userOptionsPressed: {
        backgroundColor: '#D4D8E5',
    },
    userOptionsText: {
        color: 'black',
        fontSize: 20,
        bottom: 6,
        left: 1,
    }
});

export default UserBar;