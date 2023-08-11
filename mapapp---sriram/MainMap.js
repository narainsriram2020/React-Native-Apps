import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';
import MapView, { Marker, Polyline } from 'react-native-maps';
import * as Location from 'expo-location';
import { getDistance } from 'geolib';
import { Stopwatch } from 'react-native-stopwatch-timer';
import { FontAwesome } from '@expo/vector-icons';

const MainMap = ({ navigation }) => {
  const [region, setRegion] = useState(null);
  const [initalLat, setInitLat] = useState();
  const [initalLon, setInitLon] = useState();
  const [long, setLong] = useState(0);
  const [lat, setLat] = useState(0);
  const [userLocation, setUserLocation] = useState([]);
  const [userPosition, setuserPosition] = useState([]);
  const [markers, setMarkers] = useState([]);
  const [stopwatchTime, setStopwatchTime] = useState(0);
  const [stopwatchStatus, setStopwatchStatus] = useState('stopped');
  const [sw, setSw] = useState(require('./assets/start.png'));
  const [distance, setDistance] = useState(0);
  const [swstat, setSwstat] = useState(true);
  const [averageSpeed, setAverageSpeed] = useState(0);
  const [totalturns, setTotalturns] = useState(0);
  const [timerseconds, setTimerSeconds] = useState(0);

  useEffect(() => {
    let timeString = JSON.stringify(stopwatchTime);
    let index1 = 0;
    let index2 = 0;
    for (let i = 0; i < timeString.length; i++) {
      if (timeString.substring(i, i + 1) == ':') {
        if (index1 == 0) {
          index1 = i;
        } else if (index2 == 0) {
          index2 = i;
        }
      }
    }
    let hour = Number(timeString.substring(1, index1));
    let minutes = Number(timeString.substring(index1 + 1, index2));
    let second = Number(
      timeString.substring(index2 + 1, timeString.length - 1)
    );
    setTimerSeconds(hour * 3600 + minutes * 60 + second);
  }, [stopwatchTime]);

  console.log(timerseconds);

  const handleMapGuess = () => {
    if (markers.length > 1) {
      const lastMarker = markers[markers.length - 1];
      const secondLastMarker = markers[markers.length - 2];
      const newDistance = getDistance(
        { latitude: lastMarker.latitude, longitude: lastMarker.longitude },
        {
          latitude: secondLastMarker.latitude,
          longitude: secondLastMarker.longitude,
        }
      );
      if (newDistance && newDistance !== distance) {
        setDistance(distance + newDistance);
      }
    }
    setAverageSpeed({ distance } / timerseconds);
    if (
      distance / timerseconds != Infinity &&
      !isNaN(distance / timerseconds)
    ) {
      setAverageSpeed((distance / timerseconds).toFixed(3));
    }
    setMarkers([...markers, userPosition]);
    setTotalturns(totalturns + 1);
  };

  const handleStartStopwatch = () => {
    setStopwatchStatus('started');
    setSw(require('./assets/time.png'));
    setSwstat(false);
    if (sw == require('./assets/time.png')) {
      setStopwatchStatus('stopped');
      setSw(require('./assets/start.png'));
      setSwstat(true);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.topstop}>
        <Stopwatch
          laps
          start={stopwatchStatus === 'started'}
          getTime={(time) => setStopwatchTime(time)}
          style={styles.stopwatch}
        />
      </View>
      <View style={styles.topbuttons}>
        <View style={styles.square}>
          <Text style={styles.markerText}>
            Total Distance: {distance} meters
          </Text>
        </View>
        <View style={styles.square}>
          <Text style={styles.markerText}>Avg Speed: {averageSpeed} m/s</Text>
        </View>
        <View style={styles.square}>
          <Text style={styles.markerText}>Turns: {totalturns} </Text>
        </View>
      </View>
      <MapView
        region={region}
        showsUserLocation={true}
        followsUserLocation={true}
        onUserLocationChange={(event) =>
          setuserPosition(event.nativeEvent.coordinate)
        }
        style={styles.map}>
        {markers.map((marker) => (
          <Marker
            key={`${marker.lat}-${marker.long}`}
            coordinate={marker}
            title="Marker"
            description={
              marker.time
                ? `Elapsed Time: ${marker.time.toString().substring(0, 4)}`
                : 'Starter'
            }
          />
        ))}
        {markers.length > 1 && (
          <Polyline
            coordinates={markers.map((marker) => ({
              latitude: marker.latitude,
              longitude: marker.longitude,
            }))}
            strokeColor="#000"
            strokeWidth={6}
          />
        )}
      </MapView>
      <View style={styles.buttons}>
        <TouchableOpacity
          style={styles.props_for_button}
          onPress={handleMapGuess}
          disabled={swstat}>
          <Image style={styles.image} source={require('./assets/turn.png')} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.props_for_button}
          onPress={handleStartStopwatch}>
          <Image style={styles.image} source={sw} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.props_for_button}
          onPress={() =>
            navigation.navigate('FinalScreen', {
              distance,
              totalturns,
              averageSpeed,
            })
          }
          disabled={!swstat}>
          <FontAwesome name="flag-checkered" size={44} color="black" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
  },
  map: {
    width: '100%',
    height: '55%',
    backgroundColor: '#3b3c36',
    marginTop: 170,
  },
  text: {
    fontSize: 30,
    marginTop: 10,
  },
  markerText: {
    fontSize: 15,
    color: 'white',
    fontWeight: 'bold',
    margin: 4,
  },
  topstop: {
    marginTop: 100,
    marginBottom: -60,
  },
  instructionsText: {
    fontSize: 50,
    color: '#e3e1d4',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  image: {
    resizeMode: 'contain',
    width: '60%',
    height: '60%',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 20,
    marginTop: 20,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
    marginBottom: -60,
  },
  topbuttons: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
  },
  stopwatch: {
    marginTop: 100,
    marginBottom: -100,
    margin: 100,
    backgroundColor: 'blue',
    color: 'blue',
  },
  props_for_button: {
    width: '30%',
    height: '30%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: '1%',
    backgroundColor: '#008080',
    borderRadius: 10,
    margin: 5,
  },
  square: {
    width: 100,
    height: 100,
    backgroundColor: '#008080',
    borderRadius: 10,
    marginBottom: -200,
    marginTop: 60,
    marginRight: 10,
  },
});

export default MainMap;
