import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Text, View, TouchableOpacity, Image, StyleSheet, Dimensions } from 'react-native';
import UserBar from '../components/userBar';
import PinNote from '../components/pinNote';
import { globalStyles } from '../styles/global';
import * as Location from 'expo-location';
import ImageZoom from 'react-native-image-pan-zoom';
import Modal from 'react-native-modal';

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
  const [board, setBoard] = useState({pins: [], map: 'ECO', creator: 'Me'});
  const [key, setKey] = useState(0);
  const [pinModal, setPinModal] = useState(null);
  const [panTo, setPanTo] = useState(null);
  const [searchType, setSearchType] = useState('pin');
  const [searchValue, setSearchValue] = useState('');
  const [creator, setCreator] = useState(null);
  const [isLoading, setLoading] = useState(true);
  {/* I set pins to an array of one default pin.
  when showPins() is called in the main section, it keeps giving an undefined
  error because the array is empty. I tried making the array not empty to see if
  that changed anything. */}
  const [pins, setPins] = useState([{
    UserID: 2,
    pinid: 0,
    pinName: 'temp',
    longitude: -85.577528,
    latitude: 42.934095,
    pinNotes: 'i am of no use to nobody',}])

  const getPins = async () => {
      try {
        console.log('waiting for data...');
        const response = await fetch('https://still-retreat-52810.herokuapp.com/Coordinates');
        const json = await response.json();
        console.log(json);
        return json;
     } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
  }

  useEffect(() => {
    async function getData() {
      console.log('use effect called!');
      console.log('pins are');    // show pins before update
      console.log(pins);
      console.log('Getpins returns: ', (await getPins()));
      setPins((await getPins()));

      console.log('here are the pins (called from useEffect)');
      console.log(pins);
    }
    getData();
  }, []);
  const [deletePinModal, setDeletePinModal] = useState(false);

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
    setPinModal(null);
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

  const createPin = async (button, title, tags, notes) => {
    if (button === 'create') {
      setisModalVisible(false);
      setSettingPin(false);
      setKey(key + 1);
      var lat = mapPosition.y;
      var long = mapPosition.x;

      // Post coordinate data to Heroku app
      try {
        const response = await fetch('https://still-retreat-52810.herokuapp.com/Coordinates/', {
          method: 'post',
          headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            UserID: 2,      // we need to work UserID in here as a prop sometime
            pinid: key,
            pinName: title,
            longitude: long.toFixed(14),
            latitude: lat.toFixed(14),
            pinNotes: notes,
            })
          });
          if (response.status !== 200) {
            alert('Pin could not be placed');
            return;
          } 
      }catch (error) {
            alert('Something went wrong!');
      }

      // Update pins useState in app
      try {
        setPins((await getPins()));
      } catch (error) {
        alert('Pin could not be saved');
      }

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
      left: (mapLongToCenterX(parseFloat(pin.longitude)) - mapPosition.x) * mapPosition.zoom,
      top: (mapLatToCenterY(parseFloat(pin.latitude)) - mapPosition.y) * mapPosition.zoom + Dimensions.get('window').height / 2 - PINHEIGHT + 5,
    }
    console.log('Here are the pinPositions');
    console.log(pinPosition);
    return (
      <View key={pin.pinName + String(pin.pinid)} style={styles.mapPin}>
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

  const showTags = (tags) => {
    // The Set syntax gets rid of duplicates
    const tagList = [...new Set(tags.split(','))];
    return (
      <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
        {tagList.map((tag) =>
          tag.trim() !== '' &&
          <Text style={styles.tagText} key={tag}>#{tag.trim()}</Text>
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
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Text style={styles.pinModalTitle}>{pinModal.title}</Text>
          <TouchableOpacity onPress={() => setPinModal(null)}>
            <Text style={{fontSize: 25, paddingRight: 5,}}>X</Text>
          </TouchableOpacity>
        </View>
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
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Text style={styles.latLongText}>{mapYToLat(pinModal.y).toFixed(12)}, {mapXToLong(pinModal.x).toFixed(12)}</Text>
          <TouchableOpacity style={styles.deletePin} onPress={() => setDeletePinModal(true)}>
            <Image source={require('../assets/trash.png')} style={styles.deletePinIcon}></Image>
          </TouchableOpacity>
        </View>
      </View>
    )
  }

  const showDeletePinModal = () => {
    return (
      <Modal isVisible={true}>
        <View style={styles.deletePinModal}>
          <Text style={{alignSelf: 'center', fontSize: 25, margin: 10,}}>Delete pin?</Text>
          <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
            <TouchableOpacity style={styles.deletePinModalButton} onPress={() => deletePin()}>
              <Text>Yes</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.deletePinModalButton} onPress={() => setDeletePinModal(false)}>
              <Text>No</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    )
  }

  const deletePin = () => {
    setBoard({
      upvotes: board.upvotes,
      title: board.title,
      creator: board.creator,
      map: board.map,
      pins: board.pins.filter((pin) => pin.title !== pinModal.title),
    });
    setDeletePinModal(false);
    setPinModal(null);
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
<<<<<<< HEAD
      {/* I added an isLoading check to keep it from trying to display the pins
          before they'd been retrieved from the server. It didn't really help.*/}
      {isLoading ? <ActivityIndicator/> : (
        // The map
        <ImageZoom
          cropWidth={Dimensions.get('window').width}
          cropHeight={Dimensions.get('window').height}
          imageWidth={MAPWIDTH + Dimensions.get('window').width * (1/mapPosition.zoom)}
          imageHeight={MAPHEIGHT + Dimensions.get('window').height * (1/mapPosition.zoom)}
          pinchToZoom={true}
          panToMove={true}
          centerOn={panTo}
          minScale={0.4}
          onClick={() => {getLocation(); setShowLocation(!showLocation); setPinModal(null);}}
          enableCenterFocus={false}
          onMove={(event) => handleSetMapPosition(event, MAPWIDTH, MAPHEIGHT)}
        >
          <Image
            source={require('../assets/mapEcoPreserve.png')}
            style={mapStyle}
          />
         {/* I also tried displaying the pins using a FlatList...
         <FlatList
                    data={pins}
                    keyExtractor={({ pinid }, index) => pinid.toString()}
                    renderItem={({ item }) => (
                      <View key={item.pinName + String(item.pinid)} style={styles.mapPin}>
                        <TouchableOpacity onPress={() => clickPin(item)} style={{
                                          left: (item.longitude - mapPosition.x) * mapPosition.zoom,
                                          top: (item.latitude - mapPosition.y) * mapPosition.zoom + Dimensions.get('window').height / 2 - PINHEIGHT + 5,
                                            }}>
                            <Image source={require('../assets/gem.png')} style={pinImage} />
                        </TouchableOpacity>
                       </View>
                        )}
                                          />*/}
        </ImageZoom>
        )}

    {/* User bar at top of the screen */}
=======
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
>>>>>>> eb2491867b1fa328b4ae668fc6ac4318da785121
      <UserBar
        userPhoto={userPhoto}
        navigator={navigation}
        boardScreen={false}
<<<<<<< HEAD
        setBoard={(board) => setPins(board)}
=======
        setBoard={(board) => setBoard(board)}
        setSearchType={setSearchType}
        setSearchValue={setSearchValue}
        setCreator = {setCreator}
        setResetMap={() => {setSettingPin(false); setPinModal(null)}}
>>>>>>> eb2491867b1fa328b4ae668fc6ac4318da785121
      />

      {/* Drop pin button on map */}
      {settingPin ? placingPinButtons() : pinButton()}
      {settingPin && ghostPin()}

<<<<<<< HEAD
      {isLoading ? <ActivityIndicator/> : (pins.map((pin) => showPin(pin)))}
=======
      {board.pins.map((pin) => showPin(pin))}
>>>>>>> eb2491867b1fa328b4ae668fc6ac4318da785121
      {pinModal !== null && showPinModal()}
      {deletePinModal && showDeletePinModal()}

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
<<<<<<< HEAD
=======
    flexDirection: 'column',
    elevation: 10,
>>>>>>> eb2491867b1fa328b4ae668fc6ac4318da785121
  },
  pinModalTitle: {
    fontSize: 25,
    fontWeight: 'bold',
  },
  pinModalLabel: {
    fontSize: 20,
    marginTop: 3,
    fontStyle: 'italic',
<<<<<<< HEAD
    textDecorationLine: 'underline'
=======
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
    marginTop: 0,
    marginLeft: 3,
    fontSize: 15,
    bottom: 1,
>>>>>>> eb2491867b1fa328b4ae668fc6ac4318da785121
  },
  pinModalText: {
    marginRight: 6,
    fontSize: 20,
<<<<<<< HEAD
    marginTop: 3,
=======
    backgroundColor: '#F2F2F2',
    marginTop: 10,
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
>>>>>>> eb2491867b1fa328b4ae668fc6ac4318da785121
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
  },
  deletePinIcon: {
    width: 35,
    height: 35,
  },
  deletePin: {
    borderRadius: 5,
    height: 30,
    marginTop: 10,
    marginBottom: 5,
  },
  deletePinModal: {
    backgroundColor: '#F2F2F2',
    width: 200,
    height: 120,
    alignSelf: 'center'
  },
  deletePinModalButton: {
    marginTop: 10,
    width: 50,
    height: 33,
    backgroundColor: '#C4C4C4',
    alignItems: 'center',
    justifyContent: 'center'
  }
});

export default MapScreen;