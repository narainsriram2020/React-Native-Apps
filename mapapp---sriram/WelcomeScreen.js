import * as React from 'react';
import { Text, View, StyleSheet, SafeAreaView, Image, ImageBackground, TouchableOpacity, Pressable, Modal } from 'react-native';
import { useState } from 'react';
import { FontAwesome5 } from '@expo/vector-icons';

export default function WelcomeScreen({ navigation }) {
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <View style={styles.header}>
    <FontAwesome5 name="running" size={200} color="white" />
      <Text style= {{fontSize: 30, marginTop: 30, color: 'white', marginBottom: 20}}>
           WELCOME 
      </Text>
      <TouchableOpacity style = {styles.startButton} onPress = {() => navigation.navigate("MainMap")}>
          <Text style={styles.instructionsText}>
            Start
          </Text>
        </TouchableOpacity>  
    </View>
    
  );
}

const styles = StyleSheet.create({
header: {
  backgroundColor: 'black',
  flex: 2,
  opacity: .85,
  justifyContent: 'center',
  alignItems: 'center'
},
startButton: {
  backgroundColor: '#008080',
  padding: 10,
  paddingLeft: 40,
  paddingRight: 40,
  borderRadius: 100,
  borderWidth: 1,
  borderColor: '#008080',
},
instructionsText: {
  fontSize: 50,
  color: 'white',
  fontWeight: 'bold',
  textAlign: 'center',
},
image: {
  resizeMode: 'contain',
  width: '60%',
  height: '60%',
},
});
