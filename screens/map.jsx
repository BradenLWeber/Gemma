import React, { useState } from 'react';
import { Text, View, TouchableOpacity, Image, StyleSheet, Dimensions } from 'react-native';
import UserBar from '../components/userBar';
import PinNote from '../components/pinNote';
import { globalStyles } from '../styles/global';
import * as Location from 'expo-location';
import ImageZoom from 'react-native-image-pan-zoom';

const MapScreen = ({ route, navigation }) => {

  const MAPWIDTH = 1500;
  const MAPHEIGHT = 1500;
  const PINHEIGHT = 40;
  const PINWIDTH = 40;
  const MAPCORNERS = {
    NW: {latitude: 42.938471, longitude: -85.584682},
    NE: {latitude: 42.938471, longitude: -85.572594},
    SW: {latitude: 42.929547, longitude: -85.584682},
    SE: {latitude: 42.929547, longitude: -85.572594},
  };

  const [isModalVisible, setisModalVisible] = useState(false);
  const [boardsType, setBoardsType] = useState('My');
  const [userPhoto, setUserPhoto] = useState('default');
  const [myLocation, setMyLocation] = useState({});
  const [showLocation, setShowLocation] = useState(false);
  const [settingPin, setSettingPin] = useState(false);
  const [mapPosition, setMapPosition] = useState({x: 0, y: 0, zoom: 1});
  const [pins, setPins] = useState([]);
  const [key, setKey] = useState(0);

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

  const createPin = (button, title, tags, notes) => {
    if (button === 'create') {
      setisModalVisible(false);
      setSettingPin(false);
      setKey(key + 1);
      setPins(pins.concat({
        x: mapPosition.x,
        y: mapPosition.y,
        title: title,
        tags: tags,
        notes: notes,
        key: key,
      }));
    }
  }

  const ghostPin = () => {
    return(
      <View style={styles.ghostPin}>
        <Image source={require('../assets/blue-pin.png')} style={pinImage} />
      </View>
    )
  }

  const showPin = (pin) => {
    const pinPosition = {
      left: (pin.x - mapPosition.x) * mapPosition.zoom,
      top: (pin.y - mapPosition.y) * mapPosition.zoom + Dimensions.get('window').height / 2 - PINHEIGHT,
    }
    return (
      <View style={styles.mapPin} key={pin.title + String(pin.key)}>
        <Image source={require('../assets/blue-pin.png')} style={[pinImage, pinPosition]} />
      </View>
    )
  }

  const handleSetMapPosition = (event, mapWidth, mapHeight) => {
    setMapPosition({
      x: -event.positionX + mapWidth / 2,
      y: -event.positionY + mapHeight / 2,
      zoom: event.scale
    });
  }

  const getMapCoordinates = () => {
    actualCoordinates = {
      latitude: MAPCORNERS.NW.latitude + (mapPosition.x / MAPWIDTH) * (MAPCORNERS.NE.latitude - MAPCORNERS.SW.latitude),
      longitude: MAPCORNERS.SW.longitude + (mapPosition.y / MAPHEIGHT) * (MAPCORNERS.SE.longitude - MAPCORNERS.SW.longitude),
    };
    return actualCoordinates;
  }

  // These styles require variable access, so they must be defined here
  const mapStyle = {
    position: 'absolute',
    height: MAPHEIGHT,
    width: MAPWIDTH,
    left: Dimensions.get('window').width * (1/mapPosition.zoom) / 2,
    bottom: Dimensions.get('window').height * (1/mapPosition.zoom) / 2,
  };
  const pinImage = {
  width: 50,
  height: 50,
  }

  return (
    <View style={globalStyles.container} onResponderReject>
      {/* The map */}
      <ImageZoom
        cropWidth={Dimensions.get('window').width}
        cropHeight={Dimensions.get('window').height}
        imageWidth={MAPWIDTH + Dimensions.get('window').width * (1/mapPosition.zoom)}
        imageHeight={MAPHEIGHT + Dimensions.get('window').height * (1/mapPosition.zoom)}
        pinchToZoom={true}
        panToMove={true}
        minScale={0.4}
        onClick={() => {getLocation(); setShowLocation(!showLocation);}}
        enableCenterFocus={false}
        onMove={(event) => handleSetMapPosition(event, MAPWIDTH, MAPHEIGHT)}
      >
        <Image
          source={require('../assets/mapEcoPreserve.png')}
          style={mapStyle}
        />
      </ImageZoom>

      {/* User bar at top of the screen */}
      <UserBar
        userPhoto={userPhoto}
        navigator={navigation}
        setBoardsType={(type) => setBoardsType(type)}
        boardScreen={false}
      />

      {showLocation &&
      <Text style={{position: 'absolute', bottom: 100, fontSize: 20, backgroundColor: 'white', padding: 5,}}>
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

      <PinNote state={isModalVisible} onClick={(button, title, tags, notes) => createPin(button, title, tags, notes)} />
    </View>
  );
}

const styles = StyleSheet.create({
  pinIcon: {
    width: 30,
    height: 30,
  },
  checkIcon: {
    width: 30,
    height: 30
  },
  ghostPin: {
    position: 'absolute',
    top: Dimensions.get('window').height / 2.3,
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