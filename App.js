import React, { useState } from 'react';
import UserBar from './components/userBar';
import PublicPrivateBar from './components/publicPrivateBar';
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
  const [publicOrPrivate, setPublicOrPrivate] = useState('Private');

  // Function handles a click on the public/private bar
  const clickPublicOrPrivate = () => {
    if (publicOrPrivate === 'Public') {
      setPublicOrPrivate('Private');
    } else {
      setPublicOrPrivate('Public');
    }
  }

  return (
    <View style={styles.container}>
      {/* Makes sure the top bar is placed well */}
      <View style={{height: 40}} />
      <UserBar />
      {/* Make sure the bottom bar is placed well */}
      <View style={{height: '79%'}} />
      <PublicPrivateBar type={publicOrPrivate} onClick={clickPublicOrPrivate}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
});
