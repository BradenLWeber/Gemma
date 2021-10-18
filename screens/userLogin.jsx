import React, { useState } from 'react';
import { Text, View, TouchableOpacity, StyleSheet, KeyboardAvoidingView, TextInput } from 'react-native';

const UserLoginScreen = (props) => {

  return (
    <View style={styles.userLoginView}>
      <Text style={styles.userLoginTitle}>Login</Text>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <TextInput style={styles.emailInputText} placeholder={'User email'} />
        <TextInput style={styles.passwordInputText} placeholder={'Password'} />
      </KeyboardAvoidingView>
      <TouchableOpacity onPress={() => props.navigator.navigate('Map')} style={styles.doneButton}>
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
    paddingTop: 60,
    fontSize: 30,
  },
  passwordInputText: {
    paddingTop: 40,
    fontSize: 30,
  },
  doneButton: {
    alignItems: "center",
    backgroundColor: "#6CC071",
    width: 120,
    marginTop: 60,
    padding: 10,
    borderRadius: 10,
  },
  buttonText: {
    fontSize: 30,
  },
});

export default UserLoginScreen;