/* Limitations: The app has all the basic function required for it to operate. The user can practice their times tables from numbers 1-13. Along with this, I have involved some new aspects into my code like: UseEffect, TextInput, and LinearGradient. However, one of the biggest problems I have is that it is not exactly user customizable. The app helps the user by performing the basic functions, except I could have explored more about letting the user pick their range of numbers for which they would like to practice with. While I have made a count variable to keep track of the user's score, I could have added a timer which can help track the amount of time it takes for the user to finish. Continually, another one of my problems is that the user has to complete all 169 questions possible, for them to reach the finish screen. To combat this I could have included an option for the user to enter a certain number of questions they would like to answer. One of my slight concerns is that when reloading the app, if the user moves to fast and doesn't wait for everything to fit in place, then the numbers will show up as undefined. I don't know why this is, but I beleive it might be something to do with the Snack interface. Also, my app works on IOS iPhones and iPads, but does not work on any android devices. Overall, my app fits the basic functions however, I could have expanded my reach to provide the user with more functions.
*/



import * as React from 'react';
import { useState, useEffect, setState } from 'react';
import {Slider} from '@miblanchard/react-native-slider';
import { LinearGradient } from 'expo-linear-gradient';
import {
  Text,
  View,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  TextInput
} from 'react-native';

import Constants from 'expo-constants';


// You can import from local files
import AssetExample from './components/AssetExample';

// or any pure javascript modules available in npm
import { Card } from 'react-native-paper';

export default function App() {
  const [questionNumber, setQuestionNumber] = useState(0);
  const [useranswer, setUseranswer] = useState("")
  const [count, setCount] = useState(0);
  const [firstnumbers, setFirstnumbers] = useState([]);
  const [secondnumbers, setSecondnumbers] = useState([]);
  const [num1, setNum1] = useState();
  const [num2, setNum2] = useState();
  const [lowerBound, setLowerBound] = useState(1)
  const [upperBound, setUpperBound] = useState(12)
  const [question, setQuestion] = useState();
  const [lastIndex, setLastIndex] = useState();
  const [stopGame, setStopGame] = useState(0);
  const [diff, setDiff] = useState(0);
  

  const handleSubmit = () => {
    setUseranswer("")
    if (parseInt(useranswer) == num1 * num2){
      setCount(count + 1)
      let temp1 = firstnumbers;
      let temp2 = secondnumbers;
      temp1.splice(lastIndex, 1);
      temp2.splice(lastIndex, 1);
      setFirstnumbers(temp1)
      setSecondnumbers(temp2)
      updateStates(temp1, temp2)
      setStopGame(stopGame + 1)
    }
    else{
      setCount(count - 1);
    }
    if (stopGame == 168){
      setQuestionNumber(3);
    } 
  }

  function updateStates(y, z){
    let x = Math.floor(Math.random()*(y.length))
    setLastIndex(x);
    setNum1(y[x]);
    setNum2(z[x]);
    setQuestion(y[x] + " x " + z[x]);
    console.log(y)
    console.log(stopGame)
    console.log(y.length)
  }

  useEffect(() => {
    let temp1 = []
    let temp2 = []
    for (let i = 1; i <= 13; i++){
      for (let j = 1; j <= 13; j++){
        temp1.push(i);
        temp2.push(j);
      }
    }
    setFirstnumbers(temp1)
    setSecondnumbers(temp2)
  }, [])

  function startGame(){
    setQuestionNumber(2);
    let x = Math.floor(Math.random()*(firstnumbers.length + 1))
    setLastIndex(x);
    setNum1(firstnumbers[x]);
    setNum2(secondnumbers[x]);
    setQuestion(firstnumbers[x] + " x " + secondnumbers[x]);
  }
  
  const onChanged = (t) => {
    let newText = '';
    let numbers = '0123456789';
    setUseranswer(t);
    for (var i=0; i < t.length; i++) {
      if(numbers.indexOf(t[i]) > -1 ) {
        newText = newText + t[i];
      }
    }
    //setAnswer(newText);
  }

  const clear = () => {
    answer = ""
  };
  const medium = () => {
    setDiff(20)
  }
  
  
  if (questionNumber == 0) {
    return (
      <View style={styles.containertwo}>
        <ImageBackground
          source={require('./assets/math.jpg')}
          style={styles.image}>
          <View style={{flex: 2}}>
            <Text style={{margin: 45,
    marginTop: 100,
    fontSize: 51,
    fontWeight: 'bold',
    textAlign: 'center',
    backgroundColor: '#ffffff81',}}>
              Multiplication Times Table
            </Text>
          </View>
          <View style={{flex: 1}}>
            <TouchableOpacity onPress={() => startGame()}>
              <Text
                style={{
                  textAlign: 'center',
                  fontSize: 80,
                  color: 'black',
                  shadowColor: 'green',
                  padding: 10,
                  width: '90%',
                  alignSelf: 'center',
                  borderRadius: 50000,
                  backgroundColor: '#ffffff50',
                }}>
                Start
              </Text>
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </View>
    );
  } 
  /*else if (questionNumber == 1){
    return(
      <View style={styles.container}>
        <TouchableOpacity onPress={() => startGame()}>
              <Text
                style={{
                  textAlign: 'center',
                  fontSize: 80,
                  color: 'black',
                  shadowColor: 'green',
                  padding: 10,
                  width: '90%',
                  alignSelf: 'center',
                  borderRadius: 50000,
                  backgroundColor: '#ffffff50',
                }}>
                Easy
              </Text>
            </TouchableOpacity>
       <TouchableOpacity onPress={() => startGame()}>
              <Text
                style={{
                  textAlign: 'center',
                  fontSize: 80,
                  color: 'black',
                  shadowColor: 'green',
                  padding: 10,
                  width: '90%',
                  alignSelf: 'center',
                  borderRadius: 50000,
                  backgroundColor: '#ffffff50',
                }}>
                Medium
              </Text>
            </TouchableOpacity>
        <TouchableOpacity onPress={() => startGame()}>
              <Text
                style={{
                  textAlign: 'center',
                  fontSize: 80,
                  color: 'black',
                  shadowColor: 'green',
                  padding: 10,
                  width: '90%',
                  alignSelf: 'center',
                  borderRadius: 50000,
                  backgroundColor: '#ffffff50',
                }}>
                Hard
              </Text>
            </TouchableOpacity>
      </View>
    ) 
  }*/
  else if (questionNumber == 2){
    return(
    <View style={styles.containertwo}>
      <Text style={{ textAlign: 'center', fontSize: 40, color: 'black', marginTop: 60 }}>
        SCORE: {count}
      </Text>
      <Text style={{ textAlign: 'center', fontSize: 100, color: 'black', marginTop: 100}}>
        {question}
      </Text>
    <View style={{justifyContent: 'center', flex: 1, marginTop:20, marginBottom: 100}}>
    
      <TextInput
          style={styles.textInputStyle}
          placeholder="Enter Answer"
          placeholderTextColor="black"
          keyboardType={'number-pad'}
          value = {useranswer}
          onChangeText={(text) => setUseranswer(text)}
          //defaultValue={text}
        />
      <TouchableOpacity onPress={() => {handleSubmit()}}>
        <Text
          style={{
            justifyContent: 'left',
            fontSize: 50,
            color: 'black',
            padding: 10,
            alignSelf: 'center',
            marginTop: 10,
          }}>
          Submit
        </Text>
      </TouchableOpacity>
      </View>
    </View>
    )
  } else if (questionNumber == 3){
    return(
      <View style={styles.container}>
      <LinearGradient
        // Background Linear Gradient
        colors={['#00A3E0', 'transparent']}
        style={styles.background}
      />
      <Text style={{alignSelf: 'center', fontSize: 55, color: 'black', marginBottom: 40}}>Congratulations! Your Score Is: {count}</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    flex: 2,
    backgroundColor: '#f98dc9'
  },
  containertwo: {
    justifyContent: 'center',
    flex: 1,
    backgroundColor: '#00A3E0'
  },
  image: {
    flex: 1,
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
    alignSelf: 'center'
  },
  background: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: 1000,
  },
  textInputStyle: {
    width: 250,
    backgroundColor: '#f98dc9',
    padding: 16,
    alignSelf: 'center',
    marginTop: -100
  },
  paragraph: {
    margin: 45,
    marginTop: 100,
    fontSize: 51,
    fontWeight: 'bold',
    textAlign: 'center',
    backgroundColor: '#ffffff81',
  },
});
