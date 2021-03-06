import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Image, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import imageshare from './assets/imageshare.png';
import * as  ImagePicker from 'expo-image-picker';
import * as Sharing from 'expo-sharing';
import uploadToAnonymousFilesAsync from 'anonymous-files';

export default function App() {
  const [selectedImage, setSelectedImage] = React.useState(null);

  // Request async permission to access the Camera Roll.
  let openImagePickerAsync = async () => {

    let permissionResult = await ImagePicker.requestCameraPermissionsAsync();

      if (permissionResult.granted === false) {
        alert("Permission to Camera roll is required!");
      }

    let pickerResult = await ImagePicker.launchImageLibraryAsync();
    
      if (pickerResult.canceled === true) {
        return;
      }

      // allows application to work the web platforms
      if (Platform.OS === 'web') {
        let remoteUri = await uploadToAnonymousFilesAsync(pickerResult.uri);
        setSelectedImage({ localUri: pickerResult.uri, remoteUri});
      } else {
        setSelectedImage({ localUri: pickerResult.uri, remoteUri: null});
      }

  };

  // Request async Dialog to share photos
  let openShareDialogAsync = async () => {
    if (!(await Sharing.isAvailableAsync())) {
      alert(`The image is available for sharing at: ${selectedImage.remoteUri}`);
      return;
    }

    await Sharing.shareAsync(selectedImage.localUri);
  };

  if (selectedImage !== null) {
    return (
      <View style={styles.container}>

        <Image 
          source={{ uri: selectedImage.localUri }}
          style={styles.thumbnail} />

        <TouchableOpacity 
          onPress={openShareDialogAsync}
          style={styles.button}>

            <Text
              style={styles.buttonText}>
                Share this Photo
            </Text>

        </TouchableOpacity>

      </View>
    );
  }

  return (

    <View style={styles.container}>

      <Image source={imageshare} style={styles.logo} />

      <Text style={styles.instructions}>
        To share photos from your phone with a friend, just to press the button below!
      </Text>

      <TouchableOpacity
        onPress={openImagePickerAsync}
        style={styles.button}>

          <Text
            style={styles.buttonText}>
              Pick A Photo
          </Text>

      </TouchableOpacity>

      <StatusBar style="auto" />

    </View>
  );
}

// Creates stylesheets method for App
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
    color: '#0033cc',
    fontSize: 18,
    marginHorizontal: 15,
  },

  button: {
    marginTop: 15,
    backgroundColor: '#ffcc66',
    padding: 20,
    borderRadius: 15,
  },

  buttonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#0033cc',
  },

  thumbnail: {
    width: 300,
    height: 300,
    resizeMode: "contain",
  },

});
