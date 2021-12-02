import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Text, View, TouchableOpacity, Image, StyleSheet, Dimensions } from 'react-native';
import UserBar from '../components/userBar';
import PinNote from '../components/pinNote';
import { globalStyles } from '../styles/global';
import * as Location from 'expo-location';
import ImageZoom from 'react-native-image-pan-zoom';

const MapScreen = ({ route, navigation }) => {

  const MAPHEIGHT = 1500;
  const MAPWIDTH = 1940; //MAPHEIGHT * 1.293;
  const PINHEIGHT = 50;
  const PINWIDTH = 50;
  const MAPCORNERS = {
    NW: {latitude: 42.938853, longitude: -85.585157},
    NE: {latitude: 42.938853, longitude: -85.573994},
    SW: {latitude: 42.929539, longitude: -85.585157},
    SE: {latitude: 42.929539, longitude: -85.573994},
  };

  const [isModalVisible, setisModalVisible] = useState(false);
  const [userPhoto, setUserPhoto] = useState('default');
  const [myLocation, setMyLocation] = useState({});
  const [showLocation, setShowLocation] = useState(false);
  const [settingPin, setSettingPin] = useState(false);
  const [mapPosition, setMapPosition] = useState({x: MAPWIDTH / 2, y: MAPHEIGHT / 2, zoom: 1});
  const [key, setKey] = useState(0);
  const [pinModal, setPinModal] = useState(null);
  const [panTo, setPanTo] = useState(null);
  {/* I set pins to an array of one default pin.
  when showPins() is called in the main section, it keeps giving an undefined
  error because the array is empty. I tried making the array not empty to see if
  that changed anything. */}
  const [pins, setPins] = useState([{
    UserID: 2,
    pinid: 0,
    pinName: 'temp',
    longitude: -85.57957550000000,
    latitude: 42.93419600000000,
    pinNotes: 'i am of no use to nobody',}]);
  const [isLoading, setLoading] = useState(true);
 //const [isMounted, setIsMounted] = useState(false);

  const getPins = async () => {
      try {
        const response = await fetch('https://still-retreat-52810.herokuapp.com/Coordinates');
        console.log('waiting for data...');
        const json = await response.json();
        console.log(json);
        //console.log('here are the pins (called from getPins)');
       // console.log(pins);
        return json;
     } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
  }

  useEffect(() => {
    console.log('use effect called!');
    console.log('pins are');    // show pins before update
    console.log(pins);
    let isMounted = true;     // without this, it threw an "unmounted data leak" error. (smthn bout race conditions...)
    getPins().then(json => {  // StackOverflow suggested this as a way to fix that.
      if (isMounted) {
        setPins(json); 
        console.log('here are the set pins');
        console.log(pins);
      isMounted = false;
      setLoading = false;}
    })
    //return () => {isMounted = false; setLoading(false);}
    {/* async function handleGetPins() {
      let response = await fetch('https://still-retreat-52810.herokuapp.com/Coordinates', {method: 'GET'})
      .then ((response = response.json()))
      .then(console.log(response))
      .then(setPins(response))
    */}

    //handleGetPins()
    console.log('here are the pins (called from useEffect)');
    console.log(pins);
   // setLoading(false);
  }, [pins]);

  //const [pins, setPins] = useState(handleGetPins());


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
            UserID: 2,
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
    console.log(pin);
    const pinPosition = {
      left: (parseFloat(pin.longitude) - mapPosition.x) * mapPosition.zoom,
      top: (parseFloat(pin.latitude) - mapPosition.y) * mapPosition.zoom + Dimensions.get('window').height / 2 - PINHEIGHT + 5,
    }
    return (
      <View key={pin.pinName + String(pinid)} style={styles.mapPin}>
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
        <Text style={styles.pinModalText}>{mapYToLat(pinModal.y)}</Text>
        <Text style={styles.pinModalLabel}>Longitude:</Text>
        <Text style={styles.pinModalText}>{mapXToLong(pinModal.x)}</Text>
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
      latitude: mapYToLat(mapPosition.x),
      longitude: mapXToLong(mapPosition.y),
    };
    return actualCoordinates;
  }

  const mapXToLong = (x) => {
    return MAPCORNERS.SW.longitude + (x / MAPWIDTH) * (MAPCORNERS.NE.longitude - MAPCORNERS.SW.longitude);
  }

  const mapYToLat = (y) => {
    return MAPCORNERS.NE.latitude - (y / MAPHEIGHT) * (MAPCORNERS.NE.latitude - MAPCORNERS.SW.latitude);
  }

  // Calculates the Y coming from the center because that is the Y used in ImageZoom to center the map
  const mapLatToCenterY = (lat) => {
    return (lat - MAPCORNERS.SW.latitude) / (MAPCORNERS.NE.latitude - MAPCORNERS.SW.latitude) * MAPHEIGHT - MAPHEIGHT / 2;
  }

  // Calculates the X coming from the center because that is the X used in ImageZoom to center the map
  const mapLongToCenterX = (long) => {
    return - (long - MAPCORNERS.SW.longitude) / (MAPCORNERS.NE.longitude - MAPCORNERS.SW.longitude) * MAPWIDTH + MAPWIDTH / 2;
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
      <UserBar
        userPhoto={userPhoto}
        navigator={navigation}
        boardScreen={false}
        setBoard={(board) => setPins(board)}
      />

      {/* Drop pin button on map */}
      {settingPin ? placingPinButtons() : pinButton()}
      {settingPin && ghostPin()}

      {isLoading ? <ActivityIndicator/> :(
        pins.map(({pin}) => showPin(pin)))}
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
  },
  myLocationButton: {
    position: 'absolute',
    right: 141,
  }
});

export default MapScreen;