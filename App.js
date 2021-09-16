import React from 'react';
import { Image,  StyleSheet, Text, View } from 'react-native';
import gemmaicon from './assets/gemmaidea1.jpg'; 

export default function App() {
  return (
    <View style={styles.container}>
      <Image source={gemmaicon} style={styles.logo} />

      <Text style={styles.instructions} >
        Hello, Team Furious Five!      
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 200,
    height: 250,
    marginBottom: 10,
  },
  instructions: {
    color: '#888',
    fontSize: 18,
    marginBottom: 10,
  },
});