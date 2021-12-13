import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { LogBox } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

import BoardScreen from './screens/boards';
import Login from './screens/login';
import MapScreen from './screens/map';
import SettingScreen from './screens/settings';
import UserLoginScreen from './screens/userLogin';
import UserSignupScreen from './screens/userSignup';
import AboutBoardScreen from "./screens/boardHelp";
import AboutMapScreen from "./screens/mapHelp";
import BoardsHeader from "./help/boardsHeader";
import MapHeader from "./help/mapHeader";

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
  function boardScreen({ route, navigation }) {
    return (
      <BoardScreen
        userID={route.params.userID}
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

  function userLoginScreen({ navigation }) {
    return (
      <UserLoginScreen
        navigator={navigation}
      />
    )
  };

  function userSignupScreen({ navigation }) {
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
        userPhoto={'default'}
        nickname={route.params.nickname}
        photo={route.params.photo}
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
        <Stack.Screen name="Map" component={MapScreen}
          options={({ navigation }) => ({
            headerRight: () => (
              <MapHeader navigation={navigation} />
            )
          })} />
        <Stack.Screen name="Boards" component={boardScreen}
          options={({ navigation }) => ({
            headerRight: () => (
              <BoardsHeader navigation={navigation} />
            )
          })}  />
        <Stack.Screen name="User Login" component={userLoginScreen} />
        <Stack.Screen name="User Sign Up" component={userSignupScreen} />
        <Stack.Screen name="Settings" component={settingsScreen} />
        <Stack.Screen name="About Boards" component={AboutBoardScreen} />
        <Stack.Screen name="About Map" component={AboutMapScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
