import React, { useState, useRef, createRef, useEffect } from 'react';
import { Text, View, TouchableOpacity, StyleSheet, KeyboardAvoidingView, TextInput, Keyboard } from 'react-native';
import ForgotPassword from '../components/forgotPassword';

// useEffect code from https://github.com/calvin-cs262-organization/monopoly-client
// login GET ideas from https://github.com/calvin-cs262-organization/monopoly-client

const UserLoginScreen = (props) => {
  //const [username, setUsername] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [userPhoto, setUserPhoto] = useState('https://scontent-ort2-1.xx.fbcdn.net/v/t1.6435-1/p148x148/66809435_10156811580748462_298237271994269696_n.jpg?_nc_cat=100&ccb=1-5&_nc_sid=1eb0c7&_nc_ohc=3sDvYWe41uQAX9uBr7l&_nc_ht=scontent-ort2-1.xx&oh=94344cfc8b679f337a5480004463abb7&oe=61836442');
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
      props.navigator.navigate('Map', userPhoto);
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
            emailInputRef.current &&
            emailInputRef.current.focus()
          }
          blurOnSubmit={false}
        />
        <TextInput
          secureTextEntry={true}
          style={styles.passwordInputText}
          onChangeText={(password) => setUserPassword(password)}
          placeholder={'Password'}
          ref={passwordInputRef}
          returnKeyType="next"
          onSubmitEditing={() =>
            passwordCheckInputRef.current &&
            passwordCheckInputRef.current.focus()
          }
          blurOnSubmit={false} />
      </KeyboardAvoidingView>
      <TouchableOpacity onPress={forgotPasswordModal} style={styles.forgotButton}>
        <Text style={styles.forgotButtonText}>Forgot password?</Text>
      </TouchableOpacity>
      <ForgotPassword state={isModalVisible} onClick={(button, userPassword) => handleForgotPassword(button, userPassword)} />
      <TouchableOpacity onPress={handleLoginDone} style={styles.doneButton}>
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