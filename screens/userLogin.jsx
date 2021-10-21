import React, { useState, useRef, createRef } from 'react';
import { Text, View, TouchableOpacity, StyleSheet, KeyboardAvoidingView, TextInput, Keyboard } from 'react-native';

const UserLoginScreen = (props) => {
  //const [username, setUsername] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [userPhoto, setUserPhoto] = useState('https://scontent-ort2-1.xx.fbcdn.net/v/t1.6435-1/p148x148/66809435_10156811580748462_298237271994269696_n.jpg?_nc_cat=100&ccb=1-5&_nc_sid=1eb0c7&_nc_ohc=3sDvYWe41uQAX9uBr7l&_nc_ht=scontent-ort2-1.xx&oh=94344cfc8b679f337a5480004463abb7&oe=61836442');

  const passwordInputRef = createRef();

  const handleLoginDone = () => {
    if (!userEmail) {
      alert('Please fill Email');
      return;
    }
    if (!userPassword) {
      alert('Please fill Password');
      return;
    }
    props.navigator.navigate('Map', userPhoto);
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
          returnKeyType="next"
          onSubmitEditing={() =>
            passwordCheckInputRef.current &&
            passwordCheckInputRef.current.focus()
          }
          blurOnSubmit={false} />
      </KeyboardAvoidingView>
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
  doneButton: {
    alignItems: "center",
    backgroundColor: "#6CC071",
    width: 120,
    marginTop: 50,
    padding: 10,
    borderRadius: 10,
  },
  buttonText: {
    fontSize: 30,
  },
});

export default UserLoginScreen;