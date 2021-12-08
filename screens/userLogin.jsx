import React, { useState, useRef, createRef, useEffect } from 'react';
import { Text, View, TouchableOpacity, StyleSheet, KeyboardAvoidingView, TextInput, Keyboard } from 'react-native';
import ForgotPassword from '../components/forgotPassword';

// useEffect code from https://github.com/calvin-cs262-organization/monopoly-client
// login GET ideas from https://github.com/calvin-cs262-organization/monopoly-client

const UserLoginScreen = (props) => {
  //const [username, setUsername] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [isModalVisible, setisModalVisible] = useState(false);

  const passwordInputRef = createRef();
  const emailInputRef = createRef();
  const passwordCheckInputRef = createRef();

  const forgotPasswordModal = () => {
    setisModalVisible(true);
  }

  const handleForgotPassword = (button, password) => {
    if (button === 'cancel') {
      setisModalVisible(false);
    }
    else if (button === 'change') {
      setisModalVisible(false);
      setUserPassword(password);
      alert('Password has been changed successfully');
      return;
    }
  }

  const handleLoginDone = async () => {
    try {
      const response = await fetch('https://still-retreat-52810.herokuapp.com/AUsers/' + userEmail + '/' + userPassword, { method: 'GET' });
      if (response.status !== 200) {
        alert('Login failed');
        return;
      }
      const json = await response.json();
      props.geoPermissions();
      console.log(json);
      props.navigator.navigate('Map', json.userid)
    } catch (error) {
      alert("Invalid email or password");
    }
  }

  return (
    <View style={styles.userLoginView}>
      <Text style={styles.userLoginTitle}>Login</Text>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <TextInput
          style={styles.emailInputText}
          onChangeText={(email) => setUserEmail(email)}
          keyboardType="email-address"
          placeholder={'User email'}
          returnKeyType="next"
          onSubmitEditing={() =>
            passwordInputRef.current &&
            passwordInputRef.current.focus()
          }
          blurOnSubmit={false}
        />
        <TextInput
          secureTextEntry={true}
          style={styles.passwordInputText}
          onChangeText={(password) => setUserPassword(password)}
          placeholder={'Password'}
          ref={passwordInputRef}
          // returnKeyType="next"
          blurOnSubmit={true} />
      </KeyboardAvoidingView>
      <TouchableOpacity onPress={forgotPasswordModal} style={styles.forgotButton}>
        <Text style={styles.forgotButtonText}>Forgot password?</Text>
      </TouchableOpacity>
      <ForgotPassword state={isModalVisible} onClick={(button, userPassword) => handleForgotPassword(button, userPassword)} />
      <TouchableOpacity
        onPress={handleLoginDone}
        style={styles.doneButton}>
        <Text style={styles.buttonText}>Done</Text>
      </TouchableOpacity>
    </View>

  )
}

const styles = StyleSheet.create({
  userLoginView: {
    flexDirection: 'column',
    padding: 10,
  },
  userLoginTitle: {
    textAlign: 'left',
    fontWeight: 'bold',
    fontSize: 50,
    color: '#201E3C',
    backgroundColor: '#6CC071',
    paddingLeft: 10,
  },
  emailInputText: {
    paddingTop: 40,
    fontSize: 30,
  },
  passwordInputText: {
    paddingTop: 30,
    fontSize: 30,
  },
  forgotButton: {
    flexDirection: 'row-reverse',
    paddingRight: 10,
    position: 'absolute',
    left: 3,
    top: 250,
  },
  forgotButtonText: {
    fontSize: 20,
    fontStyle: 'italic',
    color: '#28539c',
  },
  doneButton: {
    alignItems: "center",
    backgroundColor: "#6CC071",
    width: 120,
    marginTop: 80,
    padding: 10,
    borderRadius: 10,
  },
  buttonText: {
    fontSize: 30,
  },
});

export default UserLoginScreen;