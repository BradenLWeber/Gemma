import React, { useState } from 'react';

import Login from './screens/login';
import BoardScreen from './screens/boards';
import MapScreen from './screens/map';
import UserLoginScreen from './screens/userLogin';
import UserSignupScreen from './screens/userSignup';
import SettingScreen from './screens/settings';
import { StyleSheet, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

export default function App() {
  const [username, setUsername] = useState('FuriousFive5');
  const [userEmail, setUserEmail] = useState('abc123@mail');
  const [boardsType, setBoardsType] = useState('My');
  const [userPhoto, setUserPhoto] = useState('default');

  // Used to store information from the google login
  const setUserInfo = (name, email, photo) => {
    setUsername(name);
    setUserEmail(email);
    setUserPhoto(photo);
  }

  function boardScreen({ navigation }) {
    return (
      <BoardScreen
       // boardsType={boardsType}
        setBoardsType={setBoardsType}
        navigator={navigation}
        userPhoto={'default'}
      />
    )
  }

  function loginScreen({ navigation }) {
    return (
      <Login
        navigator={navigation}
      />
    )
  };

  function userLoginScreen({ navigation }) {
    return (
      <UserLoginScreen
        navigator={navigation}
      //setUserInfo={setUserInfo}
      />
    )
  };

  function userSignupScreen({ navigation }) {
    return (
      <UserSignupScreen
        navigator={navigation}
      //setUserInfo={setUserInfo}
      />
    )
  };

  function settingsScreen({ navigation }) {
    return (
      <SettingScreen
        navigator={navigation}
        userPhoto={userPhoto}
      />
    )
  };

  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={loginScreen} />
        <Stack.Screen name="Map" component={MapScreen} />
        <Stack.Screen name="Boards" component={boardScreen} />
        <Stack.Screen name="User Login" component={userLoginScreen} />
        <Stack.Screen name="User Sign Up" component={userSignupScreen} />
        <Stack.Screen name="Settings" component={settingsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  addWrapper: {
    width: 30,
    height: 30,
    backgroundColor: '#FFF',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  PinButton: {
    position: 'absolute',
    bottom: 10,
    right: 10,
  },
});
