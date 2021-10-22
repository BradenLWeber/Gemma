import React from 'react';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';
import Modal from 'react-native-modal';
import PublicPrivateBar from './publicPrivateBar';

{/* Here's the tutorial I'm using to learn about Modals: 
https://blog.logrocket.com/creating-a-pop-up-modal-in-react-native/ 

Also using library 'react-native-modal'... y'all might need to run 'npm i react-native-modal'*/}

const PinNote = (props) => {
        return(
            <Modal isVisible={props.state}>
                <View style={styles.Modal}>
                    <Text style={styles.Header}> Create a new pin </Text>
                    <View style={styles.InputView}>
                        <TextInput placeholder={'Title'} style={styles.Title}/>
                        <TextInput placeholder={'Tags'} style={styles.Tags}/>
                        <TextInput placeholder={'Notes'} style={styles.Notes}/>
                        <PublicPrivateBar style={{paddingLeft: 10}}/>                   
                         </View>
                    <Button title="Hide modal" onPress={props.onClick}/>
                </View>
            </Modal>
        )

};

const styles = StyleSheet.create({
    Header: {
        fontSize: 20,
        paddingTop: 5,
        paddingLeft: 5,
       // style: 'bold',
        backgroundColor: '#6CC071'
    },
    InputView: {
        justifyContent: 'flex-start',
        height: 120,
        marginTop: 20,
        marginLeft: 10,
        marginRight: 10
    },
    Modal: {
        backgroundColor: '#E5E5E5',
        justifyContent: 'space-around',
        flexDirection: 'column'
    },
    Notes: {
        marginTop: 5,
        fontSize: 15,
        height: 50,
        backgroundColor: '#FFFFFF'
    },
    Tags: {
        alignItems: 'center',
        marginTop: 5,
        fontSize: 15,
        height: 20,
        width: 200,
        backgroundColor: '#FFFFFF'
    },
    Title: {
        alignItems: 'center',
        marginTop: 5,
        fontSize: 15,
        height: 20,
        backgroundColor: '#FFFFFF'
    }
});

export default PinNote;