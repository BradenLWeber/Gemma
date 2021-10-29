import React, { useState } from 'react';
import { Text, View, TouchableOpacity, Image, StyleSheet, Dimensions } from 'react-native';
import PublicPrivateBar from '../components/publicPrivateBar';
import UserBar from '../components/userBar';
import PinNote from '../components/pinNote';
import { globalStyles } from '../styles/global';
import * as Location from 'expo-location';
import ImageZoom from 'react-native-image-pan-zoom';

const MapScreen = ({ route, navigation }) => {

  // const [publicOrPrivate, setPublicOrPrivate] = useState('Private');
  const [isModalVisible, setisModalVisible] = useState(false);
  const [boardsType, setBoardsType] = useState('My');
  const [userPhoto, setUserPhoto] = useState('default');
  const [myLocation, setMyLocation] = useState({});
  const [showLocation, setShowLocation] = useState(false);
  const [settingPin, setSettingPin] = useState(false);
  const [mapPosition, setMapPosition] = useState({x: 0, y: 0, zoom: 1});
  const [debug, setDebug] = useState();
  const [pins, setPins] = useState([]);
  const [mapCorners, nil] = useState({
    NW: {latitude: 42.938471, longitude: -85.584682},
    NE: {latitude: 42.938471, longitude: -85.572594},
    SW: {latitude: 42.929547, longitude: -85.584682},
    SE: {latitude: 42.929547, longitude: -85.572594},
  });


 {/*} // Function handles a click on the public/private bar
  const clickPublicOrPrivate = () => {
    if (publicOrPrivate === 'Public') {
      setPublicOrPrivate('Private');
    } else {
      setPublicOrPrivate('Public');
    }
  } */}

  const getLocationPermissions = async () => {
    const response = await Location.getForegroundPermissionsAsync();
    return response.granted;
  }

  const getLocation = async () => {
    const response = await Location.getCurrentPositionAsync({accuracy: Location.Accuracy.Highest});
    const location = {latitude: response.coords.latitude, longitude: response.coords.longitude};
    setMyLocation({ latitude: location.latitude, longitude: location.longitude});
    return location;
  }

  // Function handles displaying, hiding a pin's notes
  const handleCheck = () => {
    setisModalVisible(() => !isModalVisible);
  }

  const handleX = () => {
    setSettingPin(false);
  }

  const handlePlacePin = () => {
    setSettingPin(true);
  }

  const pinButton = () => {
    return (
      <TouchableOpacity style={globalStyles.PinButton} onPress={handlePlacePin}>
        <View style={globalStyles.addWrapper}>
          <Image source={require('../assets/blue-pin.png')} style={styles.pinIcon} />
        </View>
      </TouchableOpacity>
    )
  }

  const checkAndXButton = () => {
    return (
        <View style={globalStyles.PinButton}>
          <TouchableOpacity style={styles.xButton} onPress={handleX}>
            <View style={globalStyles.addWrapper}>
              <Image source={require('../assets/blue-x.png')} style={styles.checkIcon} />
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleCheck}>
            <View style={globalStyles.addWrapper}>
              <Image source={require('../assets/blue-check.png')} style={styles.checkIcon} />
            </View>
          </TouchableOpacity>
        </View>
    )
  }

  const createPin = (button) => {
    setisModalVisible(false);
    setSettingPin(false);
    if (button === 'create') {
      setPins(pins.concat({
        x: -mapPosition.x,
        y: -mapPosition.y,
        title: button.title,
        tags: button.tags,
        notes: button.notes
      }));
    }
  }

  const ghostPin = () => {
    return(
      <View style={styles.ghostPin}>
        <Image source={require('../assets/blue-pin.png')} style={styles.pinImage} />
      </View>
    )
  }

  const showPin = (pin) => {
    const pinPosition = {left: pin.x + mapPosition.x, top: pin.y + mapPosition.y + 315};
    return (
      <View style={styles.mapPin} key={pin.title}>
        <Image source={require('../assets/blue-pin.png')} style={[styles.pinImage, pinPosition]} />
      </View>
    )
  }

  const handleSetMapPosition = (event) => {
    setMapPosition({x: event.positionX, y: event.positionY, zoom: event.scale});
  }

  const getMapCoordinates = () => {
    actualCoordinates = {
      latitude: mapCorners.NW.latitude + (mapPosition.x / 1500) * (mapCorners.NE.latitude - mapCorners.SW.latitude),
      longitude: mapCorners.SW.longitude + (mapPosition.y / 1500) * (mapCorners.SE.longitude - mapCorners.SW.longitude),
    };
    return actualCoordinates;
  }

  return (
    <View style={globalStyles.container} onResponderReject>
      {/* The map */}
      <ImageZoom
        cropWidth={Dimensions.get('window').width}
        cropHeight={Dimensions.get('window').height}
        imageWidth={1500 + Dimensions.get('window').width}
        imageHeight={1500 + Dimensions.get('window').height}
        pinchToZoom={true}
        panToMove={true}
        minScale={0.4}
        onClick={() => {getLocation(); setShowLocation(!showLocation);}}
        enableCenterFocus={false}
        onMove={(event) => handleSetMapPosition(event)}
      >
        <Image
          source={require('../assets/mapEcoPreserve.png')}
          style={styles.map}
        />
      </ImageZoom>

      {/* Public/private bar at the bottom of the screen 
      <PublicPrivateBar type={publicOrPrivate} onClick={clickPublicOrPrivate} /> */}

      {/* User bar at top of the screen */}
      <UserBar
        userPhoto={userPhoto}
        navigator={navigation}
        setBoardsType={(type) => setBoardsType(type)}
        boardScreen={false}
      />

      {showLocation && <Text style={{position: 'absolute', bottom: 100, fontSize: 20, backgroundColor: 'white', padding: 5,}}>
        Your location:{'\n'}
        Latitude: {myLocation.latitude}{'\n'}
        Longitude: {myLocation.longitude}{'\n\n'}
        Map location{'\n'}
        Latitude: {getMapCoordinates().latitude}{'\n'}
        Longitude: {getMapCoordinates().longitude}{'\n'}
      </Text>}

      {/* Drop pin button on map */}
      {settingPin ? checkAndXButton() : pinButton()}
      {settingPin && ghostPin()}

      {pins.map((pin) => showPin(pin))}

      {/* <Text style={{top: 200, fontSize: 30, position: 'absolute'}}>Debug: {pins[0].x}</Text> */}

      <PinNote state={isModalVisible} onClick={(button) => createPin(button)} />
    </View>
  );
}

const styles = StyleSheet.create({
  map: {
    position: 'absolute',
    height: 1500,
    width: 1500,
    left: 195,
    top: 365,
  },
  pinIcon: {
    width: 30,
    height: 30,
  },
  checkIcon: {
    width: 30,
    height: 30
  },
  pinImage: {
    width: 50,
    height: 50,
  },
  ghostPin: {
    position: 'absolute',
    top: Dimensions.get('window').height / 2.4,
    alignSelf: 'center',
  },
  mapPin: {
    position: 'absolute'
  },
  xButton: {
    position: 'absolute',
    right: 70,
  }
});

export default MapScreen;