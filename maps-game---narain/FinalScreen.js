import * as React from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  SafeAreaView,
  ImageBackground,
} from 'react-native';
import { useState } from 'react';
import { useRoute } from '@react-navigation/native';

export default function FinalScreen({ navigation }) {
  const route = useRoute()
  const score = route.params?.score

  return (
    <SafeAreaView style={{flex: 1, backgroundColor:"#3b3c36"}}>
    
    <View style={{alignItems: 'center'}}>
    <View style={styles.modalView}> 
      <View>
        <Text style={styles.finalText}>
        Thanks for playing
        </Text>
      </View>
    </View>
    <View style={styles.modalView}> 
      <View>
        <Text style={styles.finalText}>
        Final Score: 
        </Text>
        <Text style={styles.scoreText}>
        {score}
        </Text>
      </View>
    </View>
    <View style={{ flexDirection: 'row'}}>   
        <TouchableOpacity style = {{
    margin: 10,
    opacity: .95,
    backgroundColor: 'black',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
  }} onPress = {() => navigation.navigate("WelcomeScreen")}>
          <Text style={styles.buttonText}>
            Play
          </Text>
          <Text style={styles.buttonText}>
            Again?
          </Text>          
        </TouchableOpacity>   
    </View>
    </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  modalView: {
    margin: 10,
    opacity: .95,
    backgroundColor: '#3b3c36',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
  },
  finalText: {
    fontSize: 40,
    marginTop: 100,
    color: '#e3e1d4',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  scoreText: {
    fontSize: 30,
    color: '#e3e1d4',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  buttonText: {
    fontSize: 20,
    color: '#e3e1d4',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
