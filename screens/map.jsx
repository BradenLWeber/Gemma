import React, { useState } from 'react';
import { Text, View, TouchableOpacity, Image, StyleSheet, Dimensions } from 'react-native';
import PublicPrivateBar from '../components/publicPrivateBar';
import UserBar from '../components/userBar';
import PinNote from '../components/pinNote';
import { globalStyles } from '../styles/global';
import ImageZoom from 'react-native-image-pan-zoom';

const MapScreen = ({ route, navigation }) => {

  const [publicOrPrivate, setPublicOrPrivate] = useState('Private');
  const [isModalVisible, setisModalVisible] = useState(false);
  const [boardsType, setBoardsType] = useState('My');


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

  return (
    <View style={globalStyles.container} onResponderReject>
      {/* The map */}
      <ImageZoom
        cropWidth={Dimensions.get('window').width}
        cropHeight={Dimensions.get('window').height}
        imageWidth={1500}
        imageHeight={1500}
        pinchToZoom={true}
        panToMove={true}
        minScale={0.4}
        enableCenterFocus={false}
      >
        <Image
          source={require('../assets/mapEcoPreserve.png')}
          style={styles.map}
        />
      </ImageZoom>

      {/* Public/private bar at the bottom of the screen */}
      <PublicPrivateBar type={publicOrPrivate} onClick={clickPublicOrPrivate} />

      {/* User bar at top of the screen */}
      <UserBar
        userPhoto={'../assets/defaultAvatar.png'}
        navigator={navigation}
        setBoardsType={(type) => setBoardsType(type)}
        boardScreen={false}
      />

      {/* Drop pin button on map */}
      <TouchableOpacity style={globalStyles.PinButton} onPress={handleModal}>
        <View style={globalStyles.addWrapper}>
          <Text> + </Text>
        </View>
      </TouchableOpacity>
      <PinNote state={isModalVisible} onClick={() => setisModalVisible()} />
    </View>
  );
}

const styles = StyleSheet.create({
  map: {
    position: 'absolute',
    height: 1500,
    width: 1500,
  }
});

export default MapScreen;