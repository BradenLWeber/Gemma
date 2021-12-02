import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View, TouchableOpacity } from 'react-native';
import Modal from 'react-native-modal';

const AddBoard = (props) => {
    const [title, setTitle] = useState(null);
    const [preserveOrCampus, setPreserveOrCampus] = useState('Preserve');

    const handleClick = (title, type) => {
        if (title === null) {
            alert('Please fill title');
            return;
        }
        const mapType = type == 'Preserve' ? 'ECO' : 'CAM';
        props.makeBoard(title, mapType);
        setTitle(null);
    }

    return (
        <Modal isVisible={props.visibility}>
            <View style={styles.Modal}>
                <Text style={styles.Header}> Create a new board </Text>
                <View style={styles.InputView}>
                    <TextInput placeholder={'Title'} style={styles.Title} onChangeText={(text) => setTitle(text)} />
                </View>
                <View style={styles.modalButtons2}>
                    <TouchableOpacity onPress={() => setPreserveOrCampus('Preserve')} style={[styles.modalButton2, preserveOrCampus == 'Preserve' ? styles.selectedButton : {}]}>
                        <Text style={styles.modalText}>Preserve map</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setPreserveOrCampus('Campus')} style={[styles.modalButton2, preserveOrCampus == 'Campus' ? styles.selectedButton : {}]}>
                        <Text style={styles.modalText}>Campus map</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.modalButtons}>
                    <TouchableOpacity onPress={props.exitModal} style={styles.modalButton}>
                        <Text style={styles.modalText}>Cancel</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => handleClick(title, preserveOrCampus)} style={[styles.modalButton, styles.modalCreateButton]}>
                        <Text style={styles.modalText}>Create</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    )

};

const styles = StyleSheet.create({
    Header: {
        fontSize: 20,
        paddingTop: 5,
        paddingLeft: 5,
        backgroundColor: '#6CC071',
        paddingBottom: 10,
        paddingTop: 10,
        fontWeight: 'bold',
    },
    InputView: {
        justifyContent: 'flex-start',
        marginBottom: 15,
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
        height: 70,
        backgroundColor: '#FFFFFF',
        padding: 5,
        textAlignVertical: 'top',
    },
    Tags: {
        alignItems: 'center',
        marginTop: 5,
        fontSize: 15,
        height: 30,
        backgroundColor: '#FFFFFF',
        padding: 5,
        marginBottom: 5,
    },
    Title: {
        alignItems: 'center',
        marginTop: 5,
        fontSize: 15,
        height: 30,
        backgroundColor: '#FFFFFF',
        padding: 5,
    },
    modalButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    modalButtons2: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 15,
    },
    modalButton: {
        height: 40,
        width: 100,
        marginLeft: 10,
        marginRight: 10,
        marginBottom: 10,
        backgroundColor: 'lightgray',
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 3,
    },
    modalButton2: {
        height: 40,
        width: 160,
        marginLeft: 10,
        marginRight: 10,
        marginBottom: 10,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
    },
    modalText: {
        fontSize: 20,
    },
    modalCreateButton: {
        backgroundColor: '#6CC071',
    },
    selectedButton: {
        backgroundColor: '#aaaaaa',
        elevation: 3,
    }
});

export default AddBoard;