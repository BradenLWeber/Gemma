import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View, TouchableOpacity } from 'react-native';
import Modal from 'react-native-modal';

const ForgotPassword = (props) => {
  const [changeUserPassword, setChangeUserPassword] = useState(null);
  const [changeUserCheckPassword, setChangeUserCheckPassword] = useState(null);

  const handleClick = (type) => {
    if (type === 'cancel') {
      props.onClick('cancel');
      setChangeUserPassword(null);
      setChangeUserCheckPassword(null);
    } else {
      if (changeUserPassword === null) {
        alert('Please fill password');
        return;
      }
      if (changeUserCheckPassword === null) {
        alert('Please fill check password');
        return;
      }
      if (changeUserPassword !== changeUserCheckPassword) {
        alert('Passwords are not the same');
        return;
      }
      props.onClick('change', changeUserPassword);
      setChangeUserPassword(null);
      setChangeUserCheckPassword(null);
    }
  }

  return (
    <Modal isVisible={props.state}>
      <View style={styles.Modal}>
        <Text style={styles.Header}> Change Password </Text>
        <View style={styles.InputView}>
          <TextInput placeholder={'Password'} secureTextEntry={true} style={styles.password} onChangeText={(text) => setChangeUserPassword(text)} />
          <TextInput placeholder={'Confirm Password'} secureTextEntry={true} style={styles.confirmPassword} onChangeText={(text) => setChangeUserCheckPassword(text)} />
        </View>
        <View style={styles.modalButtons}>
          <TouchableOpacity onPress={() => handleClick('cancel')} style={styles.modalButton}>
            <Text style={styles.modalText}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleClick('change')} style={[styles.modalButton, styles.modalChangeButton]}>
            <Text style={styles.modalText}>Change</Text>
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
    marginBottom: 30,
    marginTop: 20,
    marginLeft: 10,
    marginRight: 10
  },
  Modal: {
    backgroundColor: '#E5E5E5',
    justifyContent: 'space-around',
    flexDirection: 'column'
  },
  confirmPassword: {
    alignItems: 'center',
    marginTop: 5,
    fontSize: 15,
    height: 30,
    backgroundColor: '#FFFFFF',
    padding: 5,
    marginBottom: 5,
  },
  password: {
    alignItems: 'center',
    marginTop: 5,
    fontSize: 15,
    height: 30,
    backgroundColor: '#FFFFFF',
    padding: 5,
    marginBottom: 5,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
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
  },
  modalText: {
    fontSize: 20,
  },
  modalChangeButton: {
    backgroundColor: '#6CC071',
  },
});

export default ForgotPassword;

