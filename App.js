import React, { useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { LogBox } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

import BoardScreen from './screens/boards';
import Login from './screens/login';
import MapScreen from './screens/map';
import SettingScreen from './screens/settings';
import UserLoginScreen from './screens/userLogin';
import UserSignupScreen from './screens/userSignup';

{/* This is the client application for Gemma, a geolocator service.
  Gemma is Team D's course project for CS262 at Calvin University.

  @authors: Braden Weber, Becca DiCosola, Eleanor Lee, Grace Jung, Oscar Schott
  Fall 2021
*/}


// This gets rid of the non-serialized warning when passing a function through route.params
LogBox.ignoreLogs([
  'Non-serializable values were found in the navigation state',
]);

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

  // Import Boards screen
  function boardScreen({ route, navigation }) {
    return (
      <BoardScreen
        setBoardsType={setBoardsType}
        userID={route.params.userID}
        setCreator={route.params.setCreator}
        navigator={navigation}
        userPhoto={'default'}
        setBoard={route.params.setBoard}
      />
    )
  }

  // Import Login screen (the first screen, technically more like a landing page)
  function loginScreen({ navigation }) {
    return (
      <Login
        navigator={navigation}
      />
    )
  };

  // Import User Login screen
  function userLoginScreen({ route, navigation }) {
    return (
      <UserLoginScreen
        navigator={navigation}
      />
    )
  };

  // Import Sign Up screen
  function userSignupScreen({ route, navigation }) {
    return (
      <UserSignupScreen
        navigator={navigation}
      />
    )
  };

// Import Settings (Profile) screen
  function settingsScreen({ route, navigation }) {
    return (
      <SettingScreen
        navigator={navigation}
        userID={route.params.userID}
        userPhoto={userPhoto}
        locationPermission={route.params.locationPermission}
      />
    )
  };

  const Stack = createNativeStackNavigator();

  // Set up the navigation for the app.
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
