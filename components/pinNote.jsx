import React from 'react';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';
import Modal from 'react-native-modal';

{/* Here's the tutorial I'm using to learn about Modals: 
https://blog.logrocket.com/creating-a-pop-up-modal-in-react-native/ 

Also using library 'react-native-modal'... y'all might need to run 'npm i react-native-modal'*/}

const PinNote = (props) => {
        return(
            <Modal isVisible={props.state}>
                <View style={styles.Modal}>
                    <Text style={styles.Header}>Drop a pin</Text>
                    <TextInput placeholder={'Title'} style={styles.Title}/>
                    <TextInput placeholder={'Notes'} style={styles.Notes}/>
                    <Button title="Hide modal" onPress={props.onClick}/>
                </View>
            </Modal>
        )

};

const styles = StyleSheet.create({
    Header: {
        fontSize: 20,
        paddingTop: 5,
        paddingLeft: 5
    },
    Modal: {
        backgroundColor: '#E5E5E5',
        justifyContent: 'space-around'
    },
    Notes: {
        alignItems: 'center',
        marginTop: 20,
        fontSize: 15,
        height: 50
    },
    Title: {
        alignItems: 'center',
        marginTop:5,
        fontSize: 15,
        height: 20
    }
});

export default PinNote;