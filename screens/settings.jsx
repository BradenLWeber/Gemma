import React, { createRef, useState, } from 'react';
import { Image, KeyboardAvoidingView, StyleSheet, Switch, Text, TextInput, TouchableOpacity, View, } from 'react-native';
import * as Location from 'expo-location';

{/* The settings screen displays the user's avatar, nickname, and GPS preferences.
*/}

const Settings = (props) => {
  const [userID, setUserID] = useState(props.userID);
  const [userPhotoList, setUserPhotoList] = useState({ default: require('../assets/defaultAvatar.png') })
  const [username, setUsername] = useState('FuriousFive5');
  const [GPS, setGPS] = useState(props.locationPermission);

  const nameInputRef = createRef();

  const handleSettingsSave = () => {
    props.navigator.navigate('Map');
  }
  const handlePicture = () => {

  }
  const setPermissions = async (value) => {
    if (value === true) {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status === 'granted') {
        setGPS(true);
      }
    } else {
      alert('Turn off permissions in the settings');
    }
  }

  return (
    <View style={styles.settingsView}>
      <Text style={styles.settingsTitle}>Settings</Text>
      {/* User avatar */}
      <TouchableOpacity onPress={handlePicture}>
        <View style={styles.photoSetting}>
          <Image source={userPhotoList[props.userPhoto]} style={styles.userImage} />
        </View>
        <Text style={styles.imageText}>Click avatar to edit</Text>
      </TouchableOpacity>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>

        {/* Nickname field */}
        <View style={styles.nameInput}>
          <Text style={styles.nameLabel}>USER DISPLAYED NAME</Text>
          <TextInput
            style={styles.nameInputText}
            onChangeText={(username) => setUsername(username)}
            placeholder={username}
            returnKeyType="next"
            onSubmitEditing={() =>
              nameInputRef.current &&
              nameInputRef.current.focus()
            }
            blurOnSubmit={false}
          />
        </View>
      </KeyboardAvoidingView>

      {/* GPS on/off toggle */}
      <View style={styles.gpsWrapper}>
        <Text style={styles.nameLabel}>GPS ON/OFF</Text>
        <Switch
          trackColor={{ false: 'gray', true: '#6CC071' }}
          thumbColor="white"
          ios_backgroundColor="gray"
          onValueChange={(value) => setPermissions(value)}
          value={GPS}
          style={{ transform: [{ scaleX: 1.3 }, { scaleY: 1.3 }], marginTop: 5 }}
        />
      </View>

      {/* Save button */}
      <TouchableOpacity onPress={handleSettingsSave} style={styles.saveButton}>
        <Text style={styles.saveText}>Save</Text>
      </TouchableOpacity>
    </View >
  )
};

const styles = StyleSheet.create({
  gpsWrapper: {
    paddingTop: 20,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  imageText: {
    color: '#201E3C',
    fontSize: 18,
    textAlign: 'center',
    fontStyle: 'italic',
  },
  nameInput: {
    paddingTop: 20,
  },
  nameInputText: {
    fontSize: 20,
  },
  nameLabel: {
    color: '#201E3C',
    fontSize: 14,
  },
  photoSetting: {
    paddingTop: 20,
    alignItems: 'center',
  },
  saveButton: {
    alignItems: "center",
    backgroundColor: "#6CC071",
    width: 90,
    marginTop: 50,
    padding: 10,
    borderRadius: 10,
  },
  saveText: {
    fontSize: 20,
  },
  settingsTitle: {
    textAlign: 'left',
    fontWeight: 'bold',
    fontSize: 50,
    color: '#201E3C',
    backgroundColor: '#6CC071',
    paddingLeft: 10,
  },
  settingsView: {
    flexDirection: 'column',
    padding: 10,
  },
  userImage: {
    width: 140,
    height: 140,
    borderRadius: 70,
    borderWidth: 2,
    borderColor: '#201E3C',
  },
});

export default Settings;
