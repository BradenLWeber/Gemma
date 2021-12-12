import React, { createRef, useState } from 'react';
import { KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

{/* userLogin is the login screen. 
It allows users who have an account with Gemma to sign in using their email and password.

// useEffect code from https://github.com/calvin-cs262-organization/monopoly-client
// login GET ideas from https://github.com/calvin-cs262-organization/monopoly-client
*/}

const UserLoginScreen = (props) => {
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [isModalVisible, setisModalVisible] = useState(false);

  const passwordInputRef = createRef();
  const emailInputRef = createRef();
  const passwordCheckInputRef = createRef();

  // Check if login information entered by user is in the database
  const handleLoginDone = async () => {
    try {
      const response = await fetch('https://still-retreat-52810.herokuapp.com/AUsers/' + userEmail + '/' + userPassword, { method: 'GET' });
      if (response.status !== 200) {
        alert('Login failed');
        return;
      }
      const json = await response.json();
      console.log(json);
<<<<<<< HEAD
      props.navigator.navigate('Map', { userid: json.userid, nickname: json.nickname, photo: json.photo })
=======

      // If user enters correct information, continue to map screen
      props.navigator.navigate('Map', json.userid)
>>>>>>> 11d444c535f61c92ca8e6b2e0d53ce13e627ac31
    } catch (error) {
      alert("Invalid email or password");
    }
  }

  return (
    <View style={styles.userLoginView}>
      <Text style={styles.userLoginTitle}>Login</Text>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        {/* Email field */}
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

        {/* Password field */}
        <TextInput
          secureTextEntry={true}
          style={styles.passwordInputText}
          onChangeText={(password) => setUserPassword(password)}
          placeholder={'Password'}
          ref={passwordInputRef}
          blurOnSubmit={true} />
      </KeyboardAvoidingView>

      {/* Done button */}
      <TouchableOpacity
        onPress={handleLoginDone}
        style={styles.doneButton}>
        <Text style={styles.buttonText}>Done</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  buttonText: {
    fontSize: 30,
  },
  doneButton: {
    alignItems: "center",
    backgroundColor: "#6CC071",
    width: 120,
    marginTop: 40,
    padding: 10,
    borderRadius: 10,
  },
  emailInputText: {
    paddingTop: 40,
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
  passwordInputText: {
    paddingTop: 30,
    fontSize: 30,
  },
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
});

export default UserLoginScreen;