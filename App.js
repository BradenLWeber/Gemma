import React, { useState } from 'react';
import UserBar from './components/userBar';
import PublicPrivateBar from './components/publicPrivateBar';
import Login from './components/login';
import PinNote from './components/pinNote';
import { Button, StyleSheet, Text, TextInput, View, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Modal from 'react-native-modal';

export default function App() {
  const [publicOrPrivate, setPublicOrPrivate] = useState('Private');
  const [isModalVisible, setisModalVisible] = useState(false);

  // Function handles a click on the public/private bar
  const clickPublicOrPrivate = () => {
    if (publicOrPrivate === 'Public') {
      setPublicOrPrivate('Private');
    } else {
      setPublicOrPrivate('Public');
    }
  }

  // Function handles displaying, hiding a pin's notes
  const handleModal = () => {
    setisModalVisible(() => !isModalVisible);
  }

  function mapScreen({ route, navigation }) {
    const { email, name, photoUrl } = route.params;
    const userPhoto = photoUrl ? {uri: photoUrl} : require('./assets/favicon.png');

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

        <TouchableOpacity style={styles.PinButton} onPress={handleModal}>
          <View style={styles.addWrapper}>
          <Text> + </Text>
          </View>
          </TouchableOpacity>
          <PinNote state={isModalVisible} onClick={() => setisModalVisible()}/>
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
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 10
  }
});
