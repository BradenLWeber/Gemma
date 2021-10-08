import React, { useState } from 'react';
import UserBar from './components/userBar';
import PublicPrivateBar from './components/publicPrivateBar';
import Login from './components/login';
import PinNote from './components/pinNote';
import Board from './components/board';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

export default function App() {
  const [username, setUsername] = useState('FuriousFive5');
  const [userEmail, setUserEmail] = useState('abc123@mail');
  const [boardsType, setBoardsType] = useState('My');
  const [userPhoto, setUserPhoto] = useState('https://scontent-ort2-1.xx.fbcdn.net/v/t1.6435-1/p148x148/66809435_10156811580748462_298237271994269696_n.jpg?_nc_cat=100&ccb=1-5&_nc_sid=1eb0c7&_nc_ohc=3sDvYWe41uQAX9uBr7l&_nc_ht=scontent-ort2-1.xx&oh=94344cfc8b679f337a5480004463abb7&oe=61836442');
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

  // Used to store information from the google login
  const setUserInfo = (name, email, photo) => {
    setUsername(name);
    setUserEmail(email);
    setUserPhoto(photo);
  }

  function mapScreen({ navigation }) {
    return (
      <View style={styles.container}>
        {/* Makes sure the top bar is placed well */}
        <View style={{height: 10}} />
        {/* Public/private bar at the bottom of the screen */}
        <PublicPrivateBar type={publicOrPrivate} onClick={clickPublicOrPrivate} />

        {/* User bar at top of the screen */}
        <UserBar
          userPhoto={{uri: userPhoto}}
          navigator={navigation}
          setBoardsType={(type) => setBoardsType(type)}
          boardScreen={false}
        />
      </View>
    );
  };

  function loginScreen({navigation}) {
    return (
      <View>
        <Login navigator={navigation} setUserInfo={setUserInfo}/>

        <TouchableOpacity style={styles.PinButton} onPress={handleModal}>
          <View style={styles.addWrapper}>
          <Text> + </Text>
          </View>
          </TouchableOpacity>
          <PinNote state={isModalVisible} onClick={() => setisModalVisible()}/>
      </View>
    )
  };

  function boardsScreen({navigation}) {
    return (
      <>
        <View style={{alignItems: 'center', top: 12}}>
          <View style={styles.boardContainer}>
            <View style={styles.screenTitleView}>
              <Text style={styles.screenTitleText}>{boardsType} boards</Text>
            </View>
          </View>
          <Board boardType={boardsType} navigator={navigation}/>
          <Board boardType={boardsType} navigator={navigation}v/>
          <Board boardType={boardsType} navigator={navigation}/>
          <UserBar
            userPhoto={{uri: userPhoto}}
            navigator={navigation}
            setBoardsType={(type) => setBoardsType(type)}
            boardScreen={true}
          />
        </View>
      </>
    )
  }

  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Map">
        <Stack.Screen name="Login" component={loginScreen}/>
        <Stack.Screen name="Map" component={mapScreen} />
        <Stack.Screen name="Boards" component={boardsScreen} />
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
  },
  screenTitleView: {
    marginBottom: 10,
  },
  screenTitleText: {
    fontSize: 25,
    marginBottom: 5,
  },
  boardContainer: {
    marginTop: 75,
    width: '90%',
    alignSelf: 'center'
  },
});
