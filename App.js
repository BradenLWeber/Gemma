import React, { useState } from 'react';
import UserBar from './components/userBar';
import PublicPrivateBar from './components/publicPrivateBar';
import Login from './components/login';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

export default function App() {
  const [publicOrPrivate, setPublicOrPrivate] = useState('Private');

  // Function handles a click on the public/private bar
  const clickPublicOrPrivate = () => {
    if (publicOrPrivate === 'Public') {
      setPublicOrPrivate('Private');
    } else {
      setPublicOrPrivate('Public');
    }
  }

  function mapScreen({ route, navigation }) {
    const { email, name, photoUrl } = route.params;
    const userPhoto = photoUrl ? {uri: photoUrl} : require('./assets/favicon.png');
    // const userPhoto = require('./assets/favicon.png');

    return (
      <View style={styles.container}>
        {/* Makes sure the top bar is placed well */}
        <View style={{height: 10}} />
        <UserBar userPhoto={userPhoto}/>
        {/* Make sure the bottom bar is placed well */}
        <View style={{height: '82%'}} />
        <PublicPrivateBar type={publicOrPrivate} onClick={clickPublicOrPrivate}/>
      </View>
    );
  };

  function loginScreen({navigation}) {
    return (
      <View>
        <Login navigator={navigation}/>
      </View>
    )
  };

  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={loginScreen}/>
        <Stack.Screen name="Map" component={mapScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
});
