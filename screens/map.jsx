import React, { useState } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import PublicPrivateBar from '../components/publicPrivateBar';
import UserBar from '../components/userBar';
import PinNote from '../components/pinNote';
import { globalStyles } from '../styles/global';


const mapScreen = ({ navigation }) => {

  const [publicOrPrivate, setPublicOrPrivate] = useState('Private');
  const [userPhoto, setUserPhoto] = useState('https://scontent-ort2-1.xx.fbcdn.net/v/t1.6435-1/p148x148/66809435_10156811580748462_298237271994269696_n.jpg?_nc_cat=100&ccb=1-5&_nc_sid=1eb0c7&_nc_ohc=3sDvYWe41uQAX9uBr7l&_nc_ht=scontent-ort2-1.xx&oh=94344cfc8b679f337a5480004463abb7&oe=61836442');
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
    <View style={globalStyles.container}>
      {/* Makes sure the top bar is placed well */}
      <View style={{ height: 10 }} />
      {/* Public/private bar at the bottom of the screen */}
      <PublicPrivateBar type={publicOrPrivate} onClick={clickPublicOrPrivate} />

      {/* User bar at top of the screen */}
      <UserBar
        userPhoto={{ uri: userPhoto }}
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

export default mapScreen;