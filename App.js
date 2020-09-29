import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import imageshare from './assets/imageshare.png';

export default function App() {
  return (
    <View style={styles.container}>
      <Image source={imageshare} style={styles.logo} />

      <Text style={styles.instructions}>To share photos from your phone with a friend, just to press the button below!</Text>

      <TouchableOpacity
        onPress={() => alert('Button works')}>
          <Text>Pick A Photo</Text>
      </TouchableOpacity>
      <StatusBar style="auto" />
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
    width: 305,
    height: 305,
    marginBottom: 10,
  },
  instructions: {
    color: '#8B8',
    fontSize: 18,
    marginHorizontal: 15,
  },
});
