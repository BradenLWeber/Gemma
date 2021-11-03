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
  const PINHEIGHT = 50;
  const PINWIDTH = 50;
  const MAPCORNERS = {
    NW: {latitude: 42.938471, longitude: -85.584682},
    NE: {latitude: 42.938471, longitude: -85.572594},
    SW: {latitude: 42.929547, longitude: -85.584682},
    SE: {latitude: 42.929547, longitude: -85.572594},
  };

  const [isModalVisible, setisModalVisible] = useState(false);
  const [userPhoto, setUserPhoto] = useState('default');
  const [myLocation, setMyLocation] = useState({});
  const [showLocation, setShowLocation] = useState(false);
  const [settingPin, setSettingPin] = useState(false);
  const [mapPosition, setMapPosition] = useState({x: 0, y: 0, zoom: 1});
  const [pins, setPins] = useState([]);
  const [key, setKey] = useState(0);
  const [pinModal, setPinModal] = useState(null);

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

  const chooseBoard = () => {
    setPins(BOARD);
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
          <Image source={require('../assets/gem.png')} style={styles.pinIcon} />
        </View>
      </TouchableOpacity>
    )
  }

  const placingPinButtons = () => {
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
        <Image source={require('../assets/gem.png')} style={pinImage} />
      </View>
    )
  }

  const showPin = (pin) => {
    const pinPosition = {
      left: (pin.x - mapPosition.x) * mapPosition.zoom,
      top: (pin.y - mapPosition.y) * mapPosition.zoom + Dimensions.get('window').height / 2 - PINHEIGHT + 5,
    }
    return (
      <View key={pin.title + String(pin.key)} style={styles.mapPin}>
        <TouchableOpacity onPress={() => clickPin(pin)} style={pinPosition}>
          <Image source={require('../assets/gem.png')} style={pinImage} />
        </TouchableOpacity>
      </View>
    )
  }

  const clickPin = (pin) => {
    if (pin !== pinModal) {
      setPinModal(pin);
    } else {
      setPinModal(null);
    }
  }

  const showPinModal = () => {
    const modalPosition = {
      left: (pinModal.x - mapPosition.x) * mapPosition.zoom + 90,
      top: (pinModal.y - mapPosition.y) * mapPosition.zoom + Dimensions.get('window').height / 2 - PINHEIGHT + 60,
    }
    return (
      <View style={[styles.pinModal, modalPosition]}>
        <Text style={styles.pinModalTitle}>{pinModal.title}</Text>
        <Text style={styles.pinModalLabel}>Tags:</Text>
        {pinModal.tags && <Text style={styles.pinModalText}>{pinModal.tags}</Text>}
        <Text style={styles.pinModalLabel}>Notes:</Text>
        {pinModal.notes && <Text style={styles.pinModalText}>{pinModal.notes}</Text>}
        <Text style={styles.pinModalLabel}>Latitude:</Text>
        <Text style={styles.pinModalText}>{mapXToLat(pinModal.x)}</Text>
        <Text style={styles.pinModalLabel}>Longitude:</Text>
        <Text style={styles.pinModalText}>{mapYToLong(pinModal.y)}</Text>
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
      latitude: mapXToLat(mapPosition.x),
      longitude: mapYToLong(mapPosition.y),
    };
    return actualCoordinates;
  }

  const mapXToLat = (x) => {
    return MAPCORNERS.NW.latitude + (x / MAPWIDTH) * (MAPCORNERS.NE.latitude - MAPCORNERS.SW.latitude);
  }

  const mapYToLong = (y) => {
    return MAPCORNERS.SW.longitude + (y / MAPHEIGHT) * (MAPCORNERS.SE.longitude - MAPCORNERS.SW.longitude);
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
    width: PINWIDTH,
    height: PINHEIGHT,
  };

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
        onClick={() => {getLocation(); setShowLocation(!showLocation); setPinModal(null)}}
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
        boardScreen={false}
        setBoard={setPins}
      />

      {/* Drop pin button on map */}
      {settingPin ? placingPinButtons() : pinButton()}
      {settingPin && ghostPin()}

      {pins.map((pin) => showPin(pin))}
      {pinModal !== null && showPinModal()}

      <PinNote state={isModalVisible} onClick={(button, title, tags, notes) => createPin(button, title, tags, notes)} />
    </View>
  );
}

const styles = StyleSheet.create({
  pinModal: {
    position: 'absolute',
    backgroundColor: 'lightgray',
    borderColor: 'gray',
    borderWidth: 3,
    padding: 6,
    width: Dimensions.get('window').width - 40,
  },
  pinModalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  pinModalLabel: {
    fontSize: 20,
    marginTop: 3,
    fontStyle: 'italic',
    textDecorationLine: 'underline'
  },
  pinModalText: {
    marginRight: 6,
    fontSize: 20,
    marginTop: 3,
  },
  pinIcon: {
    width: 40,
    height: 40,
  },
  checkIcon: {
    width: 30,
    height: 30
  },
  ghostPin: {
    position: 'absolute',
    top: Dimensions.get('window').height / 2.26,
    alignSelf: 'center',
    elevation: 1,
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