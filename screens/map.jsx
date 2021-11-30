import React, { useState } from 'react';
import { Text, View, TouchableOpacity, Image, StyleSheet, Dimensions } from 'react-native';
import UserBar from '../components/userBar';
import PinNote from '../components/pinNote';
import { globalStyles } from '../styles/global';
import * as Location from 'expo-location';
import ImageZoom from 'react-native-image-pan-zoom';

const MapScreen = ({ route, navigation }) => {

  const MAPHEIGHTECO = 1500;
  const MAPWIDTHECO = 1940;
  const MAPHEIGHTCAM = 1965;
  const MAPWIDTHCAM = 1850;
  const PINHEIGHT = 50;
  const PINWIDTH = 50;
  const MAPCORNERSECO = {
    NW: {latitude: 42.938853, longitude: -85.585157},
    NE: {latitude: 42.938853, longitude: -85.573994},
    SW: {latitude: 42.929539, longitude: -85.585157},
    SE: {latitude: 42.929539, longitude: -85.573994},
  };
  const MAPCORNERSCAM = {
    NW: {latitude: 42.937887, longitude: -85.594130},
    NE: {latitude: 42.937887, longitude: -85.579824},
    SW: {latitude: 42.926867, longitude: -85.594130},
    SE: {latitude: 42.926867, longitude: -85.579824},
  };
  const MAPS = {
    ECO: require('../assets/mapEcoPreserve.png'),
    CAM: require('../assets/CampusFinal.png')
  }

  const [isModalVisible, setisModalVisible] = useState(false);
  const [userPhoto, setUserPhoto] = useState('default');
  const [myLocation, setMyLocation] = useState({});
  const [settingPin, setSettingPin] = useState(false);
  const [mapPosition, setMapPosition] = useState({x: MAPWIDTHECO / 2, y: MAPHEIGHTECO / 2, zoom: 1});
  const [board, setBoard] = useState({pins: [], map: 'ECO'});
  const [key, setKey] = useState(0);
  const [pinModal, setPinModal] = useState(null);
  const [panTo, setPanTo] = useState(null);
  const [searchType, setSearchType] = useState('pin');
  const [searchValue, setSearchValue] = useState('');
  const [creator, setCreator] = useState(null);

  const getLocationPermissions = async () => {
    const response = await Location.getForegroundPermissionsAsync();
    return response.granted;
  }

  const getLocation = async () => {
    const response = await Location.getCurrentPositionAsync({accuracy: Location.Accuracy.Highest});
    const location = {latitude: response.coords.latitude, longitude: response.coords.longitude};
    const status = await Location.getProviderStatusAsync();
    setMyLocation({ latitude: location.latitude, longitude: location.longitude, accuracy: response.coords.accuracy});
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
          <Image source={require('../assets/gem.png')} style={styles.pinIcon} />
        </View>
      </TouchableOpacity>
    )
  }

  const handleGetMyLocation = async () => {
    if (await getLocationPermissions() === false) {
      alert('Location not turned on');
      return;
    }
    await getLocation();
    const MAPCORNERS = getMapCorners();
    if (
      myLocation.longitude > MAPCORNERS.NE.longitude ||
      myLocation.longitude < MAPCORNERS.SW.longitude ||
      myLocation.latitude > MAPCORNERS.NE.latitude ||
      myLocation.latitude < MAPCORNERS.SW.latitude
    ) {
      alert(`${myLocation.longitude} > ${MAPCORNERS.NE.longitude} ${myLocation.longitude > MAPCORNERS.SW.longitude} ||\n
      ${myLocation.longitude} < ${MAPCORNERS.SW.longitude} ${myLocation.longitude < MAPCORNERS.NE.longitude} ||\n
      ${myLocation.latitude} > ${MAPCORNERS.NE.latitude} ${myLocation.latitude > MAPCORNERS.NE.latitude} ||\n
      ${myLocation.latitude} < ${MAPCORNERS.SW.latitude} ${myLocation.latitude < MAPCORNERS.SW.latitude} \n`);
      alert('You are not on the map');
      return;
    }

    const myPosition = {
      x: mapLongToCenterX(myLocation.longitude),
      y: mapLatToCenterY(myLocation.latitude),
      scale: 1.0,
      duration: 0,
    };
    // setPanTo(myPosition);
    // setPanTo(null);
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
          <TouchableOpacity style={styles.myLocationButton} onPress={handleGetMyLocation}>
            <View style={globalStyles.addWrapper}>
              <Image source={require('../assets/blue-pin.png')} style={styles.checkIcon} />
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
      setBoard({
        upvotes: board.upvotes,
        creator: board.creator,
        title: board.title,
        map: board.map,
        pins: board.pins.concat({
          x: mapPosition.x,
          y: mapPosition.y,
          title: title,
          tags: tags,
          notes: notes,
          key: key,
        }),
      });
    } else {
      setisModalVisible(false);
      setSettingPin(false);
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
    if (searchValue !== '') {
      if (searchType === 'pin' && !pin.title.toLowerCase().includes(searchValue.toLowerCase())) return;
      if (searchType === 'tag' && !pin.tags.toLowerCase().includes(searchValue.toLowerCase())) return;
    }

    const pinPosition = {
      left: (pin.x - mapPosition.x) * mapPosition.zoom,
      top: (pin.y - mapPosition.y) * mapPosition.zoom + Dimensions.get('window').height / 2 - PINHEIGHT + 5,
    }
    return (
      <View key={pin.title + String(pin.key)} style={styles.mapPin}>
        <TouchableOpacity onPress={() => clickPin(pin)} style={pinPosition}>
          <Image source={require('../assets/gem.png')} style={[pinImage, {opacity: pin === pinModal ? 1.0 : 0.4}]} />
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

  const showTags = (tags) => {
    // The Set syntax gets rid of duplicates
    const tagList = [...new Set(tags.split(','))];
    return (
      <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
        {tagList.map((tag) =>
          tag.trim() !== '' &&
          <View style={styles.tag} key={tag}>
            <Text style={styles.tagText}>
              {tag.trim()}
            </Text>
          </View>
        )}
      </View>
    )
  }

  const showPinModal = () => {
    if (searchValue !== '') {
      if (searchType === 'pin' && !pinModal.title.toLowerCase().includes(searchValue.toLowerCase())) setPinModal(null);
      if (searchType === 'tag' && !pinModal.tags.toLowerCase().includes(searchValue.toLowerCase())) setPinModal(null);
    }

    const modalPosition = {
      left: (pinModal.x - mapPosition.x) * mapPosition.zoom + 90,
      top: (pinModal.y - mapPosition.y) * mapPosition.zoom + Dimensions.get('window').height / 2 - PINHEIGHT + 60,
    }
    return (
      <View style={[styles.pinModal, modalPosition]}>
        <Text style={styles.pinModalTitle}>{pinModal.title}</Text>
        {pinModal.tags && showTags(pinModal.tags)}
        { pinModal.notes &&
        <>
          <View style={{flexDirection: 'row'}}>
            <Image source={require('../assets/defaultAvatar.png')} style={styles.pinModalUserIcon}/>
            <Text style={styles.pinModalCreator}>{board.creator}</Text>
          </View>
          <Text style={styles.pinModalText}>{pinModal.notes}</Text>
        </>
        }
        <Text style={styles.latLongText}>{mapYToLat(pinModal.y)}, {mapXToLong(pinModal.x)}</Text>
      </View>
    )
  }

  const handleSetMapPosition = (event) => {
    setMapPosition({
      x: -event.positionX + getMapWidth() / 2,
      y: -event.positionY + getMapHeight() / 2,
      zoom: event.scale
    });
  }

  const getMapCoordinates = () => {
    actualCoordinates = {
      latitude: mapYToLat(mapPosition.x),
      longitude: mapXToLong(mapPosition.y),
    };
    return actualCoordinates;
  }

  const getMapCorners = () => {
    return board.map === 'ECO' ? MAPCORNERSECO : MAPCORNERSCAM;
  }

  const getMapHeight = () => {
    return board.map === 'ECO' ? MAPHEIGHTECO : MAPHEIGHTCAM;
  }

  const getMapWidth = () => {
    return board.map === 'ECO' ? MAPWIDTHECO : MAPWIDTHCAM;
  }

  const mapXToLong = (x) => {
    const MAPCORNERS = getMapCorners();
    return MAPCORNERS.SW.longitude + (x / getMapWidth()) * (MAPCORNERS.NE.longitude - MAPCORNERS.SW.longitude);
  }

  const mapYToLat = (y) => {
    const MAPCORNERS = getMapCorners();
    return MAPCORNERS.NE.latitude - (y / getMapHeight()) * (MAPCORNERS.NE.latitude - MAPCORNERS.SW.latitude);
  }

  // Calculates the Y coming from the center because that is the Y used in ImageZoom to center the map
  const mapLatToCenterY = (lat) => {
    const MAPCORNERS = getMapCorners();
    return (lat - MAPCORNERS.SW.latitude) / (MAPCORNERS.NE.latitude - MAPCORNERS.SW.latitude) * getMapHeight() - getMapHeight() / 2;
  }

  // Calculates the X coming from the center because that is the X used in ImageZoom to center the map
  const mapLongToCenterX = (long) => {
    const MAPCORNERS = getMapCorners();
    return - (long - MAPCORNERS.SW.longitude) / (MAPCORNERS.NE.longitude - MAPCORNERS.SW.longitude) * getMapWidth() + getMapWidth() / 2;
  }

  // These styles require variable access, so they must be defined here
  const mapStyle = {
    position: 'absolute',
    height: getMapHeight(),
    width: getMapWidth(),
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
        imageWidth={getMapWidth() + Dimensions.get('window').width * (1/mapPosition.zoom)}
        imageHeight={getMapHeight() + Dimensions.get('window').height * (1/mapPosition.zoom)}
        pinchToZoom={true}
        panToMove={true}
        centerOn={panTo}
        minScale={0.3}
        enableCenterFocus={false}
        onMove={(event) => handleSetMapPosition(event)}
      >
        <Image
          source={MAPS[board.map]}
          style={mapStyle}
        />
      </ImageZoom>

      {/* User bar at top of the screen */}
      <UserBar
        userPhoto={userPhoto}
        navigator={navigation}
        boardScreen={false}
        setBoard={(board) => setBoard(board)}
        setSearchType={setSearchType}
        setSearchValue={setSearchValue}
        setCreator = {setCreator}
        setResetMap={() => {setSettingPin(false); setPinModal(null)}}
      />

      {/* Drop pin button on map */}
      {settingPin ? placingPinButtons() : pinButton()}
      {settingPin && ghostPin()}

      {board.pins.map((pin) => showPin(pin))}
      {pinModal !== null && showPinModal()}

      {/* Uncomment this and use it to show information on the map screen */}
      {/* <Text style = {{position: 'absolute', fontSize: 30, top: 100}}></Text> */}

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
    flexDirection: 'column',
  },
  pinModalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  pinModalLabel: {
    fontSize: 20,
    marginTop: 3,
    fontStyle: 'italic',
    textDecorationLine: 'underline',
  },
  tag: {
    height: 30,
    marginRight: 7,
    marginTop: 4,
    marginBottom: 4,
    backgroundColor: '#a8a8a8',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tagText: {
    margin: 7,
    fontSize: 15,
    bottom: 1,
  },
  pinModalText: {
    marginRight: 6,
    fontSize: 20,
    marginTop: 10,
    backgroundColor: '#fafafa',
    padding: 10,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 10,
  },
  latLongText: {
    marginRight: 6,
    fontSize: 15,
    marginTop: 20,
    color: 'gray'
  },
  pinModalCreator: {
    marginTop: 20,
    marginLeft: 10,
    fontSize: 15,
  },
  pinModalUserIcon: {
    height: 30,
    width: 30,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: 'black',
    marginTop: 15,
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
  },
  myLocationButton: {
    position: 'absolute',
    right: 141,
  }
});

export default MapScreen;