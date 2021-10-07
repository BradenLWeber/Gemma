import React, { useState } from 'react';
import UserBar from './components/userBar';
import PublicPrivateBar from './components/publicPrivateBar';
import Login from './components/login';
import PinNote from './components/pinNote';
import { StyleSheet, Text, View, TouchableOpacity , TouchableWithoutFeedback} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

export default function App() {
  const [publicOrPrivate, setPublicOrPrivate] = useState('Private');
  const [isModalVisible, setisModalVisible] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showSearchMenu, setShowSearchMenu] = useState(false);
  const [showOptionsMenu, setShowOptionsMenu] = useState(false);
  const [searchType, setSearchType] = useState('pin');

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

  // The popup when pressing the user icon
  const userMenu = () => {
    return (
      <View style={styles.userMenu}>
        <TouchableOpacity style={styles.menuButton}>
          <Text style={styles.menuButtonText}>Settings</Text>
        </TouchableOpacity>
        <View style={styles.menuDivider}/>
        <TouchableOpacity style={styles.menuButton}>
          <Text style={styles.menuButtonText}>Logout</Text>
        </TouchableOpacity>
      </View>
    )
  }

  // The popup when pressing the down arrow in the search bar
  const searchMenu = () => {
    return (
      <View style={styles.searchMenu}>
        <TouchableOpacity style={styles.menuButton} onPress={() => setSearchType('pin')}>
          <Text style={styles.menuButtonText}>Pin name</Text>
        </TouchableOpacity>
        <View style={styles.menuDivider}/>
        <TouchableOpacity style={styles.menuButton} onPress={() => setSearchType('creator')}>
          <Text style={styles.menuButtonText}>Creator name</Text>
        </TouchableOpacity>
        <View style={styles.menuDivider}/>
        <TouchableOpacity style={styles.menuButton} onPress={() => setSearchType('tag')}>
          <Text style={styles.menuButtonText}>Tag name</Text>
        </TouchableOpacity>
      </View>
    )
  }

  // The popup when pressing the options icon
  const optionsMenu = () => {
    return (
      <View style={styles.optionsMenu}>
        <TouchableOpacity style={styles.menuButton}>
          <Text style={styles.menuButtonText}>My boards</Text>
        </TouchableOpacity>
        <View style={styles.menuDivider}/>
        <TouchableOpacity style={styles.menuButton}>
          <Text style={styles.menuButtonText}>Public boards</Text>
        </TouchableOpacity>
      </View>
    )
  }

  // This handles any click not on a menu while a menu is open
  const closeMenu = () => {
    setShowOptionsMenu(false);
    setShowSearchMenu(false);
    setShowUserMenu(false);
  }

  // This sets up an invisible background behind the active menu that will close the
  // menu if the background is clicked
  const invisibleBackground = () => {
    return (
      <TouchableWithoutFeedback onPress={closeMenu}>
        <View style={{width: '100%', height: '100%', position: 'absolute', left: 0, top: 0}} />
      </TouchableWithoutFeedback>
    )
  }

  function mapScreen({ route, navigation }) {
    const { email, name, photoUrl } = route.params;
    const userPhoto = photoUrl ? {uri: photoUrl} : require('./assets/favicon.png');

    return (
      <View style={styles.container}>
        {/* Makes sure the top bar is placed well */}
        <View style={{height: 10}} />
        <UserBar
          userPhoto={userPhoto}
          pressUser={() => setShowUserMenu(true)}
          pressOptions={() => setShowOptionsMenu(true)}
          pressSearchOptions={() => setShowSearchMenu(true)}
          searchType={searchType}
          searchMenuShowing={showSearchMenu}
          optionsMenuShowing={showOptionsMenu}
        />
        {/* Public/private bar at the bottom of the screen */}
        <PublicPrivateBar type={publicOrPrivate} onClick={clickPublicOrPrivate}/>
        {/* If there is a menu being displayed, this invisible view takes up the whole screen
        and will make sure if the user tries to click out of the menu, the menu will close */}
        {(showOptionsMenu || showSearchMenu || showUserMenu) && invisibleBackground()}
        {/* Popups when pressing user picture, search bar dropdown, or options icon */}
        {showUserMenu && userMenu()}
        {showSearchMenu && searchMenu()}
        {showOptionsMenu && optionsMenu()}
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
  },
  userMenu: {
    position: 'absolute',
    left: 20,
    top: 80,
    width: 110,
    height: 100,
    backgroundColor: '#c4c4c4',
    alignItems: 'center',
  },
  searchMenu: {
    position: 'absolute',
    right: '20%',
    top: 80,
    width: 150,
    height: 153,
    backgroundColor: '#c4c4c4',
    alignItems: 'center',
  },
  optionsMenu: {
    position: 'absolute',
    right: 20,
    top: 80,
    width: 153,
    height: 100,
    backgroundColor: '#c4c4c4',
    alignItems: 'center',
  },
  menuButton: {
    borderColor: 'black',
    justifyContent: 'center',
    marginTop: 10,
    marginBottom: 10,
  },
  menuButtonText: {
    color: 'black',
    fontSize: 20,
  },
  menuDivider: {
    width: '80%',
    height: 2,
    backgroundColor: 'black',
  },
});
