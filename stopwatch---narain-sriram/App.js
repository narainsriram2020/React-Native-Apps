/* Limitations: Overall the app has all the basic features that a stopwatch would. The time works properly and runs up periodically with how real time does. Also, the Start button combines to become a Pause button and vice versa when one of the buttons are pressed. Continually, the reset button stops the time and changes the time to 00:00:000. However, the lap feature in the code works but it only shows one lap at a time and doesn't save previous laps. Along with this it only shows the lap at the bottom of the screen if the stopwatch is paused. The app works on both iOS and Android.
*/




import * as React from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Dimensions, ScrollView} from 'react-native';
import { useState, useEffect, setState} from 'react';
import Constants from 'expo-constants';

import { Card } from 'react-native-paper';


const screen = Dimensions.get('window');
export default function App() {
 
  const [time, setTime] = useState(0);
  const [remainingSecs, setRemainingSecs] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [mins, setMins] = useState(0);
  const [timeron, setTimeron] = useState(false);
  const [lap, setLap] = useState(0);
  const [results, setResults] = useState([]);
  const [count, setCount] = useState(0);
  const timer = useState(null);
  const [timeStarted, setTimeStarted] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [pausedTime, setPausedTime] = useState(0);
  const padToTwo = (number) => (number <= 9 ? `0${number}` : number);
  

  const getTime = (time) => {
    setMins(Math.floor(time / 60));
    setSeconds(time - mins * 60);
  }

  const result = () => {
    {results.map((item, index) => (
        <View key={index} style={styles.resultItem}>
          <Text style={styles.resultItemText}>
            Lap {results.length - index}
          </Text>

          <Text style={styles.resultItemText}>{displayTime(item)}</Text>
        </View>
      ))}
  }

  const stopTime = (time) => {
    setTime(0)
  }

  const displayTime = (sstopwatch) => {
    var msstopwatch = sstopwatch % 1000;
    sstopwatch = (sstopwatch - msstopwatch) / 1000;
    var secs = sstopwatch % 60;
    sstopwatch = (sstopwatch - secs) / 60;
    var mins = sstopwatch % 60;
    var hrs = (sstopwatch - mins) / 60;
    var ret = "";
    if (mins < 10){
      ret += "0" + mins;
    }
    else {
      ret += mins;
    }
    ret += ":"
    if (secs < 10){
      ret += "0" + secs;
    }
    else {
      ret += secs;
    }
    ret += ":"
    if (msstopwatch == 0){
      ret += "000"
    }
    else if (msstopwatch < 10){
      ret += "00" + msstopwatch
    }
    else if (msstopwatch < 100){
      ret += "0" + msstopwatch
    }
    else {
      ret += msstopwatch;
    }

    return ret;
  };
  
  toggle = () => {
    setTimeStarted(Date.now())
    setTimeron(!timeron);
    if (timeron) {
      setResults((previousResults) => [time]);
    } 
    else {
      setResults([]);
      stopTime()
    }
  }, [timeron, time]


  const Reset = () => {
    setPausedTime(0);
    setTimeron(false);
    setRemainingSecs(0);
    setMins(0);
    setSeconds(0);
    setTime(0);
    
  }
  
  function Lap(){
    index = 1
    setLap(displayTime(time));
    setLap(displayTime(time))
  }

  useEffect(() => {
    let interval = 0
    let now = Date.now()
    if (timeron) {
      interval = setInterval(() => {
        setTime(now - timeStarted + pausedTime)
      }, 1);
    }
    else {
      setPausedTime(time);
      clearInterval(interval)
    }
    return () => clearInterval(interval);
  }, [timeron, time])

  

  return (
  <View style={styles.container}>
    <Text style={styles.displayText}>{displayTime(time)}</Text>
    <TouchableOpacity onPress={this.toggle} style={styles.button}>
        <Text style={styles.buttonText}>{timeron ? 'Pause' : 'Start'}</Text>
    </TouchableOpacity>
    <TouchableOpacity onPress={() => {Reset()}} style={[styles.button, styles.buttonReset]}>
        <Text style={[styles.buttonText, styles.buttonTextReset]}>Reset</Text>
    </TouchableOpacity>
    <TouchableOpacity onPress={() => {Lap()}} style={[styles.button, styles.buttonReset]}>
        <Text style={[styles.buttonText, styles.buttonTextReset]}>Lap</Text>
    </TouchableOpacity>
    <ScrollView>
      <View style={styles.resultItem} />
      {results.map((item, index) => (
        <View key={index} style={styles.resultItem}>
          <Text style={styles.resultItemText}>
            Lap {results.length - index}         {lap}
          </Text>
        </View>
      ))}
    </ScrollView>
  </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: 'black',
    padding: 8,
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  displayText: {
  color: "#fff",
  fontSize: 70,
  fontWeight: "200",
  },
  buttonText: {
    fontSize: 45,
    color: '#f98dc9'
  },
  button: {
    borderWidth: 10,
    borderColor: '#00A3E0',
    width: screen.width / 2,
    height: screen.width / 2,
    borderRadius: screen.width / 2,
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonText: {
    fontSize: 45,
    color: '#00A3E0'
  },
  timerText: {
    color: '#fff',
    fontSize: 90,
    marginBottom: 20
  },
  buttonReset: {
  marginTop: 20,
  borderColor: "#00A3E0"
  },
  buttonTextReset: {
  color: "#00A3E0"
  },
  resultItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 1,
    borderColor: "#313131",
    height: 50,
    paddingHorizontal: 15,
  },
  resultItemText: {
    color: "#fff" 
  },
});
