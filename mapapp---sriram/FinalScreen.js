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
  const route = useRoute();
  const distance = route.params?.distance;
  const totalturns = route.params?.totalturns;
  const averageSpeed = route.params?.averageSpeed;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'black' }}>
      <View style={{ alignItems: 'center' }}>
        <View style={styles.modalView}>
        <Text style={styles.finalText1}>Final Stats:</Text>
          <View>
            <Text style={styles.finalText}>Distance:</Text>
            <Text style={styles.scoreText}>{distance} meters</Text>
            <Text style={styles.finalText}>Turns:</Text>
            <Text style={styles.scoreText}>{totalturns} turns</Text>
            <Text style={styles.finalText}>Average Speed:</Text>
            <Text style={styles.scoreText}>{averageSpeed} m/s</Text>
          </View>
        </View>
        <View style={{ flexDirection: 'row' }}>          
          <Text style={styles.buttonText1}>Nice Run!</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  modalView: {
    margin: 10,
    opacity: 0.95,
    backgroundColor: 'black',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
  },
  finalText: {
    fontSize: 40,
    marginTop: 10,
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  finalText1: {
    fontSize: 60,
    marginTop: 10,
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  scoreText: {
    fontSize: 30,
    color: '#008080',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  buttonText: {
    fontSize: 20,
    color: '#e3e1d4',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  buttonText1: {
    fontSize: 50,
    color: '#e3e1d4',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
