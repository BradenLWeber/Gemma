import React, { useState } from 'react';
import { Platform, Image, View, Text, StyleSheet, TouchableOpacity, TouchableWithoutFeedback, KeyboardAvoidingView, TextInput } from 'react-native'
import * as Location from 'expo-location';

const UserBar = (props) => {

  const [userID, setUserID] = useState(props.userID);
  const [nickname, setNickname] = useState(props.nickname);
  const [photo, setPhoto] = useState(props.photo);
  console.log('userID in UserBar: ' + userID);
  console.log('nickname in UserBar: ' + nickname);
  console.log('photo in UserBar: ' + photo);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showSearchMenu, setShowSearchMenu] = useState(false);
  // Initial state depends on whether it is on the map screen or the board screen
  const [searchType, setSearchType] = useState(props.boardScreen ? 'board' : 'pin');
  //const [userPhotoList, setUserPhotoList] = useState({ default: require('../assets/defaultAvatar.png') })
  const [userPhotoList, setUserPhotoList] = useState({ default: require('../assets/defaultAvatar.png') })

  const getLocationPermissions = async () => {
    const response = await Location.getForegroundPermissionsAsync();
    return response.granted;
  }

  const clickProfile = async () => {
    setShowUserMenu(false);
    // setResetMap is called only on the map screen, so this handles a call from the board screen as well
    props.setResetMap && props.setResetMap();
    const response = await getLocationPermissions();
    props.navigator.navigate('Settings', { locationPermission: response, userID: userID, nickname: nickname, photo: photo });
  }

  // The popup when pressing the user icon
  const userMenu = (navigator) => {
    return (
      <View style={styles.userMenu}>
        <TouchableOpacity style={styles.menuButton} onPress={clickProfile}>
          <Text style={styles.menuButtonText}>Profile</Text>
        </TouchableOpacity>
        <View style={styles.menuDivider} />
        <TouchableOpacity style={styles.menuButton} onPress={() => props.navigator.navigate('Login')}>
          <Text style={styles.menuButtonText}>Logout</Text>
        </TouchableOpacity>
      </View>
    )
  }

  // The popup when pressing the down arrow in the search bar
  const searchMenu = () => {
    // If on the board screen
    if (props.boardScreen) {
      return (
        <View style={[styles.searchMenu, styles.searchMenuBoards]}>
          <TouchableOpacity style={styles.menuButton} onPress={() => { setSearchType('board'); setShowSearchMenu(false); props.setSearchType('board') }}>
            <Text style={styles.menuButtonText}>Board name</Text>
          </TouchableOpacity>
          <View style={styles.menuDivider} />
          <TouchableOpacity style={styles.menuButton} onPress={() => { setSearchType('creator'); setShowSearchMenu(false); props.setSearchType('creator') }}>
            <Text style={styles.menuButtonText}>Creator name</Text>
          </TouchableOpacity>
        </View>
      )
      // If on the main screen
    } else {
      return (
        <View style={[styles.searchMenu, styles.searchMenuMap]}>
          <TouchableOpacity style={styles.menuButton} onPress={() => { setSearchType('pin'); setShowSearchMenu(false); props.setSearchType('pin') }}>
            <Text style={styles.menuButtonText}>Pin name</Text>
          </TouchableOpacity>
          <View style={styles.menuDivider} />
          <TouchableOpacity style={styles.menuButton} onPress={() => { setSearchType('tag'); setShowSearchMenu(false); props.setSearchType('tag') }}>
            <Text style={styles.menuButtonText}>Tag name</Text>
          </TouchableOpacity>
        </View>
      )
    }
  }

  // Handle clicking either "My boards" or "Public boards"
  // the type in this case is either "My" or "Public"
  const clickBoards = (navigator) => {
    setSearchType('board');
    props.setSearchValue('');
    this.textInput && this.textInput.clear();
    // setResetMap is called only on the map screen, so this handles a call from the board screen as well
    props.setResetMap && props.setResetMap();
    navigator.navigate('Boards', { setBoard: props.setBoard, setCreator: props.setCreator });
  }

  // This handles any click not on a menu while a menu is open
  const closeMenu = () => {
    setShowSearchMenu(false);
    setShowUserMenu(false);
  }

  // This is the down arrow at the end of the search bar
  const searchDropdown = () => {
    return (
      <TouchableOpacity style={styles.searchDropdown} onPress={() => setShowSearchMenu(true)}>
        <Text style={styles.searchDropdownText}>{showSearchMenu ? '\u02c6' : '\u02c7'}</Text>
      </TouchableOpacity>
    )
  }

  // This sets up an invisible background behind the active menu that will close the
  // menu if the background is clicked
  const invisibleBackground = () => {
    return (
      <TouchableWithoutFeedback onPress={closeMenu}>
        <View style={{ width: '100%', height: '100%', position: 'absolute', left: 0, top: 0 }} />
      </TouchableWithoutFeedback>
    )
  }

  // Makes sure search bar on map screen does not have "Search for boards..." when navigating
  // from the boards to the maps
  const searchPlaceholder = () => {
    if (searchType === 'board' && !props.boardScreen ||
      searchType === 'creator' && !props.boardScreen) {
      setSearchType('pin');
    }
    return 'Filter by ' + searchType + '...';
  }

  return (
    <>
      <View style={styles.userBar}>
        {/*User icon*/}
        <TouchableOpacity style={styles.userIcon} onPress={() => setShowUserMenu(true)}>
          <Image source={userPhotoList[props.userPhoto]} style={styles.userImage} />
        </TouchableOpacity>
        {/*Search for pins input*/}
        <View style={styles.userInput}>
          {/* This extra view wrapper allows me to specificy the width I want the textInput */}
          <View style={styles.userInputWidth}>
            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
              <TextInput
                style={styles.inputText}
                placeholder={searchPlaceholder()}
                onChangeText={(text) => props.setSearchValue(text)}
                ref={input => { this.textInput = input }}
              />
            </KeyboardAvoidingView>
          </View>
          {/* Search options icon */}
          {searchDropdown(props.boardScreen)}
        </View>
        {/*Options icon*/}
        <TouchableOpacity
          style={styles.userOptions}
          onPress={() => clickBoards(props.navigator)}
        >
          <Image source={require('../assets/board-menu.png')} style={styles.boardMenuIcon} />
        </TouchableOpacity>
      </View>
      {/* If there is a menu being displayed, this invisible view takes up the whole screen
      and will make sure if the user tries to click out of the menu, the menu will close */}
      {(showSearchMenu || showUserMenu) && invisibleBackground()}
      {/* Popups when pressing user picture, search bar dropdown, or options icon
      It is important these come AFTER the invisible background so that they are on top*/}
      {showUserMenu && userMenu(props.navigator)}
      {showSearchMenu && searchMenu()}
    </>
  )
}

const styles = StyleSheet.create({
  userBar: {
    width: '90%',
    height: 60,
    borderRadius: 15,
    backgroundColor: '#F9D01E',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    elevation: 20,
    top: 0,
    position: 'absolute',
    marginTop: 20,
  },
  userIcon: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: '#D4D8E5',
    borderColor: '#393B48',
    borderWidth: 2,
    margin: 7,
    justifyContent: 'center',
    alignItems: 'center',
  },
  userImage: {
    width: 44,
    height: 44,
    resizeMode: 'cover',
    borderRadius: 22,
  },
  userInput: {
    flex: 1,
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
    paddingLeft: 10,
    paddingRight: 10,
    borderColor: 'black',
    borderWidth: 1,
    fontSize: 20,
    flexDirection: 'row',
    height: 40,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  userInputWidth: {
    flex: 1,
  },
  inputText: {
    fontSize: 19,
  },
  searchDropdown: {
    right: 0,
    marginLeft: 10,
  },
  searchDropdownText: {
    width: 30,
    height: 30,
    fontSize: 60,
    bottom: 8,
    color: 'gray',
  },
  userOptions: {
    width: 46,
    height: 46,
    borderRadius: 23,
    margin: 7,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white'
  },
  userOptionsPressed: {
    backgroundColor: '#D4D8E5',
  },
  boardMenuIcon: {
    height: 40,
    width: 40,
    bottom: 3,
  },
  userMenu: {
    position: 'absolute',
    left: 20,
    top: 75,
    width: 110,
    height: 100,
    backgroundColor: '#F9D01E',
    alignItems: 'center',
    marginTop: 20,
    elevation: 21,
  },
  searchMenu: {
    position: 'absolute',
    right: '20%',
    top: 75,
    height: 100,
    backgroundColor: '#F9D01E',
    alignItems: 'center',
    marginTop: 20,
    elevation: 21,
  },
  searchMenuBoards: {
    width: 150,
  },
  searchMenuMap: {
    width: 125,
  },
  optionsMenu: {
    position: 'absolute',
    right: 20,
    top: 75,
    width: 153,
    height: 100,
    backgroundColor: '#F9D01E',
    alignItems: 'center',
    marginTop: 20,
    elevation: 21,
  },
  menuButton: {
    borderColor: '#201E3C',
    justifyContent: 'center',
    marginTop: 10,
    marginBottom: 10,
  },
  menuButtonText: {
    color: '#201E3C',
    fontSize: 20,
  },
  menuDivider: {
    width: '80%',
    height: 2,
    backgroundColor: '#201E3C',
  },
});

export default UserBar;