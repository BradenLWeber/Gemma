import React, { useState } from 'react';
import { Platform, Image, View, Text, StyleSheet, TouchableOpacity, TouchableWithoutFeedback, KeyboardAvoidingView, TextInput } from 'react-native'

const UserBar = (props) => {
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showSearchMenu, setShowSearchMenu] = useState(false);
  const [showOptionsMenu, setShowOptionsMenu] = useState(false);
  // Initial state depends on whether it is on the map screen or the board screen
  const [searchType, setSearchType] = useState(props.boardScreen ? 'board' : 'pin');

  // The popup when pressing the user icon
  const userMenu = (navigator) => {
    return (
      <View style={styles.userMenu}>
        <TouchableOpacity style={styles.menuButton}>
          <Text style={styles.menuButtonText}>Settings</Text>
        </TouchableOpacity>
        <View style={styles.menuDivider} />
        <TouchableOpacity style={styles.menuButton}>
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
        <View style={styles.searchMenuBoards}>
          <TouchableOpacity style={styles.menuButton} onPress={() => { setSearchType('board'); setShowSearchMenu(false); }}>
            <Text style={styles.menuButtonText}>Board name</Text>
          </TouchableOpacity>
          <View style={styles.menuDivider} />
          <TouchableOpacity style={styles.menuButton} onPress={() => { setSearchType('creator'); setShowSearchMenu(false); }}>
            <Text style={styles.menuButtonText}>Creator name</Text>
          </TouchableOpacity>
        </View>
      )
      // If on the main screen
    } else {
      return (
        <View style={styles.searchMenu}>
          <TouchableOpacity style={styles.menuButton} onPress={() => { setSearchType('pin'); setShowSearchMenu(false); }}>
            <Text style={styles.menuButtonText}>Pin name</Text>
          </TouchableOpacity>
          <View style={styles.menuDivider} />
          <TouchableOpacity style={styles.menuButton} onPress={() => { setSearchType('creator'); setShowSearchMenu(false); }}>
            <Text style={styles.menuButtonText}>Creator name</Text>
          </TouchableOpacity>
          <View style={styles.menuDivider} />
          <TouchableOpacity style={styles.menuButton} onPress={() => { setSearchType('tag'); setShowSearchMenu(false); }}>
            <Text style={styles.menuButtonText}>Tag name</Text>
          </TouchableOpacity>
        </View>
      )
    }
  }

  // The popup when pressing the options icon
  const optionsMenu = (navigator) => {
    return (
      <View style={styles.optionsMenu}>
        <TouchableOpacity style={styles.menuButton} onPress={() => clickBoards('My', navigator)}>
          <Text style={styles.menuButtonText}>My boards</Text>
        </TouchableOpacity>
        <View style={styles.menuDivider} />
        <TouchableOpacity style={styles.menuButton} onPress={() => clickBoards('Public', navigator)}>
          <Text style={styles.menuButtonText}>Public boards</Text>
        </TouchableOpacity>
      </View>
    )
  }

  // Handle clicking either "My boards" or "Public boards"
  // the type in this case is either "My" or "Public"
  const clickBoards = (type, navigator) => {
    setShowOptionsMenu(false);
    setSearchType('board');
    props.setBoardsType(type);
    navigator.navigate('Boards');
  }

  // This handles any click not on a menu while a menu is open
  const closeMenu = () => {
    setShowOptionsMenu(false);
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

  return (
    <>
      <View style={styles.userBar}>
        {/*User icon*/}
        <TouchableOpacity style={styles.userIcon} onPress={() => setShowUserMenu(true)}>
          <Image source={props.userPhoto} style={styles.userImage} />
        </TouchableOpacity>
        {/*Search for pins input*/}
        <View style={styles.userInput}>
          {/* This extra view wrapper allows me to specificy the width I want the textInput */}
          <View style={styles.userInputWidth}>
            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
              <TextInput style={styles.inputText} placeholder={'Search for ' + searchType + '...'} />
            </KeyboardAvoidingView>
          </View>
          {/* Search options icon */}
          {searchDropdown(props.boardScreen)}
        </View>
        {/*Options icon*/}
        <TouchableOpacity
          style={[styles.userOptions, props.optionsMenuShowing ? styles.userOptionsPressed : {}]}
          onPress={() => setShowOptionsMenu(true)}
        >
          <Text style={styles.userOptionsText}>. . .</Text>
        </TouchableOpacity>
      </View>
      {/* If there is a menu being displayed, this invisible view takes up the whole screen
      and will make sure if the user tries to click out of the menu, the menu will close */}
      {(showOptionsMenu || showSearchMenu || showUserMenu) && invisibleBackground()}
      {/* Popups when pressing user picture, search bar dropdown, or options icon
      It is important these come AFTER the invisible background so that they are on top*/}
      {showUserMenu && userMenu(props.navigator)}
      {showSearchMenu && searchMenu()}
      {showOptionsMenu && optionsMenu(props.navigator)}
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
    bottom: 6,
    color: 'gray',
    right: 0,
  },
  userOptions: {
    width: 46,
    height: 46,
    borderRadius: 23,
    margin: 7,
    alignItems: 'center',
    justifyContent: 'center',
  },
  userOptionsPressed: {
    backgroundColor: '#D4D8E5',
  },
  userOptionsText: {
    color: '#201E3C',
    fontSize: 20,
    bottom: 6,
    left: 1,
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
  },
  searchMenu: {
    position: 'absolute',
    right: '20%',
    top: 75,
    width: 150,
    height: 150,
    backgroundColor: '#F9D01E',
    alignItems: 'center',
    marginTop: 20,
  },
  searchMenuBoards: {
    position: 'absolute',
    right: '20%',
    top: 75,
    width: 150,
    height: 100,
    backgroundColor: '#F9D01E',
    alignItems: 'center',
    marginTop: 20,
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