import React, { useState, useRef, createRef } from 'react';
import { Text, View, TouchableOpacity, StyleSheet, KeyboardAvoidingView, TextInput } from 'react-native';

// Sign-up input ideas from https://aboutreact.com/react-native-login-and-signup/
// Info on useRef use from https://stackoverflow.com/questions/32748718/react-native-how-to-select-the-next-textinput-after-pressing-the-next-keyboar
// Sign-up POST ideas from https://github.com/calvin-cs262-organization/monopoly-client
// and https://jasonwatmore.com/post/2020/02/01/react-fetch-http-post-request-examples

const UserSignupScreen = (props) => {
  const [userid, setUserid] = useState('');
  const [username, setUsername] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [userCheckPassword, setUserCheckPassword] = useState('');
  const [userPhoto, setUserPhoto] = useState('../assets/defaultAvatar.png');

  const emailInputRef = createRef();
  const passwordInputRef = createRef();
  const passwordCheckInputRef = createRef();

  const handleSignupDone = async () => {
    if (!username) {
      alert('Please fill Name');
      return;
    }
    if (!userEmail) {
      alert('Please fill Email');
      return;
    }
    if (!userPassword) {
      alert('Please fill Password');
      return;
    }
    if (!userCheckPassword) {
      alert('Please fill Password');
      return;
    }
    if (userPassword !== userCheckPassword) {
      alert('Passwords are not the same');
      return;
    }
    try {
      const response = await fetch('https://still-retreat-52810.herokuapp.com/AUsers/', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          emailAddress: userEmail,
          passphrase: userPassword,
        })
      });
      const json = await response.json();
      console.log(json);
      return json;
    } catch (error) {
      alert("Invalid email or password");
    }
  }

  return (
    <View style={styles.userSignupView}>
      <Text style={styles.userSignupTitle}>Sign Up</Text>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <TextInput
          style={styles.nameInputText}
          onChangeText={(name) => setUsername(name)}
          placeholder={'First Name'}
          returnKeyType="next"
          onSubmitEditing={() =>
            emailInputRef.current &&
            emailInputRef.current.focus()
          }
          blurOnSubmit={false} />
        <TextInput
          style={styles.emailInputText}
          onChangeText={(email) => setUserEmail(email)}
          keyboardType="email-address"
          placeholder={'User email'}
          ref={emailInputRef}
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
          returnKeyType="next"
          onSubmitEditing={() =>
            passwordCheckInputRef.current &&
            passwordCheckInputRef.current.focus()
          }
          blurOnSubmit={false} />
        <TextInput
          secureTextEntry={true}
          style={styles.passwordInputText}
          onChangeText={(checkPassword) => setUserCheckPassword(checkPassword)}
          placeholder={'Confirm password'}
          ref={passwordCheckInputRef}
          blurOnSubmit={true} />
      </KeyboardAvoidingView>
      <TouchableOpacity
        onPress={() => handleSignupDone().then(value => props.navigator.navigate('Map', value))}
        style={styles.doneButton}>
        <Text style={styles.buttonText}>Done</Text>
      </TouchableOpacity>
    </View>

  )
}

const styles = StyleSheet.create({
  userSignupView: {
    flexDirection: 'column',
    padding: 10,
  },
  userSignupTitle: {
    textAlign: 'left',
    fontWeight: 'bold',
    fontSize: 50,
    color: '#201E3C',
    backgroundColor: '#97CCEE',
    paddingLeft: 10,
  },
  nameInputText: {
    paddingTop: 50,
    fontSize: 30,
  },
  emailInputText: {
    paddingTop: 30,
    fontSize: 30,
  },
  passwordInputText: {
    paddingTop: 30,
    fontSize: 30,
  },
  doneButton: {
    alignItems: "center",
    backgroundColor: "#97CCEE",
    width: 120,
    marginTop: 50,
    padding: 10,
    borderRadius: 10,
  },
  buttonText: {
    fontSize: 30,
  },
});

export default UserSignupScreen;