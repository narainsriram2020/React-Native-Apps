import * as React from 'react';
import { Text, View, StyleSheet, SafeAreaView, Image, ImageBackground, TouchableOpacity, Pressable, Modal } from 'react-native';
import { useState } from 'react';

export default function WelcomeScreen({ navigation }) {
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <SafeAreaView style={{flex: 1, backgroundColor:"#3b3c36"}}>
    <ImageBackground
    source={require("/components/bg.jpg")}
    style={{width: '100%', height: '100%'}}
  > 
    <View style={styles.header}>
      <Text style= {{fontSize: 30, marginTop: 5}}>
           WELCOME
      </Text>
    </View>
    <View style={styles.title}>
      <Text style={{fontSize: 30}}>ABANDONED </Text>
      <Text style={{fontSize: 30}}> BUILDINGS</Text>
      <Text style={{fontSize: 20}}>MAPGUESSER</Text>
    </View>
    <View style={styles.space}>
        <TouchableOpacity style = {styles.startButton} onPress = {() => navigation.navigate("MapGuesser")}>
          <Text style={styles.instructionsText}>
            Start
          </Text>
        </TouchableOpacity>   
    </View>
    <View style={styles.rules}>
        <Modal
          animationType="fade"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
            setModalVisible(!modalVisible);
          }}>
          <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.textStyle}>Rules: 
            Like any Geoguesser game, place a marker on the map to guess the location of corresponding to the picture shown beneath. Once you place the marker click Guess. After the score updates based on the distance of ur guess to the orginal. Click the continue button below and go on to the next image. Once you go through all the images, you will be shown your final score. Scoring works like Golf. The lower you score, the better!
              </Text>
            <Pressable
              style={[styles.button, styles.buttonOpen]}
              onPress={() => setModalVisible(!modalVisible)}>
              <Text style={styles.ruleText}>Hide Rules</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
      <View>
      <Pressable
        style={[styles.button, styles.buttonOpen]}
        onPress={() => setModalVisible(true)}>
        <Text style={styles.ruleText}>Rules</Text>
      </Pressable>
      </View>
    </View>
    </ImageBackground>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
header: {
  backgroundColor: '#3b3c36',
  flex: 2,
  opacity: .85,
  justifyContent: 'center',
  alignItems: 'center'
},
title:{
  backgroundColor:  '#625d5d',
  opacity: .75,
  flex: 10,
  justifyContent: 'center',
  alignItems: 'center',
},
space:{
  flex: 27,
  justifyContent: 'space-around',
  flexDirection: 'row',
  alignItems: 'flex-end',
  marginBottom: 10
},
instructionsText: {
    fontSize: 50,
    color: '#e3e1d4',
    fontWeight: 'bold',
    textAlign: 'center',
},
ruleText: {
    fontSize: 30,
    color: '#e3e1d4',
    fontWeight: 'bold',
    textAlign: 'center',
},
rules:{
  backgroundColor:  '#625d5d',
  flex: 4,
  flexDirection: 'row',
  justifyContent:'space-around',
  alignItems:'center',  
  opacity: .75,
},
 startButton: {
    backgroundColor: '#3b3c36',
    padding: 10,
    paddingLeft: 40,
    paddingRight: 40,
    borderRadius: 100,
    borderWidth: 1,
    borderColor: '#3b3c36',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 10,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 50,
    margintop: 0
  },
  button: {
    borderRadius: 100,
    backgroundColor: '#3b3c36',
    borderWidth: 10,
    borderColor: '#3b3c36',
    color: '#3b3c36',
  },
  textStyle: {
    color: '#3b3c36',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 20,
    marginBottom: 10
  },
});
