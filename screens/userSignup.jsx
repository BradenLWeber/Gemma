import React, { useState } from 'react';
import { Text, View, TouchableOpacity, StyleSheet, KeyboardAvoidingView, TextInput } from 'react-native';

const UserSignupScreen = (props) => {
  const [userPhoto, setUserPhoto] = useState('https://scontent-ort2-1.xx.fbcdn.net/v/t1.6435-1/p148x148/66809435_10156811580748462_298237271994269696_n.jpg?_nc_cat=100&ccb=1-5&_nc_sid=1eb0c7&_nc_ohc=3sDvYWe41uQAX9uBr7l&_nc_ht=scontent-ort2-1.xx&oh=94344cfc8b679f337a5480004463abb7&oe=61836442');

  return (
    <View style={styles.userSignupView}>
      <Text style={styles.userSignupTitle}>Sign Up</Text>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <TextInput style={styles.emailInputText} placeholder={'User email'} />
        <TextInput style={styles.passwordInputText} placeholder={'Password'} />
        <TextInput style={styles.passwordInputText} placeholder={'Confirm password'} />
      </KeyboardAvoidingView>
      <TouchableOpacity onPress={() => props.navigator.navigate('Map', userPhoto)} style={styles.doneButton}>
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
  emailInputText: {
    paddingTop: 60,
    fontSize: 30,
  },
  passwordInputText: {
    paddingTop: 40,
    fontSize: 30,
  },
  doneButton: {
    alignItems: "center",
    backgroundColor: "#97CCEE",
    width: 120,
    marginTop: 60,
    padding: 10,
    borderRadius: 10,
  },
  buttonText: {
    fontSize: 30,
  },
});

export default UserSignupScreen;