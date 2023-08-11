import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image } from 'react-native';
import MapView, {
  Marker,
  Polyline,
} from 'react-native-maps';
import { getDistance, getPreciseDistance } from 'geolib';

const MapGuesser = ({ navigation }) => {
  const [locationlong, setLocationlong] = useState(0);
  const [locationlat, setLocationlat] = useState(0);
  const [imageSource, setImageSource] = useState(null);
  const [roc, setRoc] = useState('Reset');
  const [start, setStart] = useState('Start');
  const [count, setCount] = useState(0);
  const [score, setScore] = useState(0);
  const [dis, setDis] = useState(0);
  const [showMarker, setShowMarker] = useState(false);
  const [opacity, setOpacity] = useState(1.0);
  const [disable, setDisable] = useState(false)
  const [region, setRegion] = useState({
    latitude: 53.5079145,
    longitude: -0.0899163,
    latitudeDelta: 1,
    longitudeDelta: 1,
  });
  console.log(opacity)
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [places, setPlaces] = useState([
    {
      id: 1,
      name: 'saltonsea',
      img: require('./components/saltonsea.jpeg'),
      latitude: 37.40605,
      longitude: -116.119492,
    },
    {
      id: 2,
      name: 'lakeshawnee',
      img: require('./components/lakeshawnee.jpeg'),
      latitude: 33.309082,
      longitude: -81.142372,
    },
    {
      id: 3,
      name: 'fortproctor',
      img: require('./components/fortproctor.jpeg'),
      latitude: 29.867399,
      longitude: -89.678177,
    },
    {
      id: 4,
      name: 'cityhallsubway',
      img: require('./components/cityhallsubway.jpeg'),
      latitude: 40.4245,
      longitude: -74.0024,
    },
    {
      id: 5,
      name: 'citymethodist',
      img: require('./components/citymethodist.jpg'),
      latitude: 41.6007,
      longitude: -87.3384,
    },
    {
      id: 6,
      name: 'foresthaven',
      img: require('./components/foresthaven.jpg'),
      latitude: 39.098765,
      longitude: -76.786328,
    },
    {
      id: 6,
      name: 'georgiaraceway',
      img: require('./components/georgiaraceway.webp'),
      latitude: 32.408,
      longitude: -82.424593,
    },
    {
      id: 7,
      name: 'slabcity',
      img: require('./components/slabcity.jpg'),
      latitude: 33.258,
      longitude: -115.4623,
    },
    {
      id: 8,
      name: 'tillamook',
      img: require('./components/tillamook.jpg'),
      latitude: 45.9373,
      longitude: -124.0188,
    },
    {
      id: 9,
      name: 'vulturecity',
      img: require('./components/vulturecity.jpg'),
      latitude: 33.8172,
      longitude: -112.8325,
    },
    {
      id: 10,
      name: 'alcatraz',
      img: require('./components/alcatraz.jpg'),
      latitude: 37.827,
      longitude: -122.423,
    },
  ]);
  const usaRegion = {
    latitude: 37.0902,
    longitude: -95.7129,
    latitudeDelta: 65,
    longitudeDelta: 65,
  };

  const [placelocation, setPlacelocation] = useState(null);

  const handleMapPress = (event) => {
    setDisable(false)
    setOpacity(0.0)
    setSelectedLocation({
      latitude: event.nativeEvent.coordinate.latitude,
      longitude: event.nativeEvent.coordinate.longitude,
    });
  };

  const shuffle = () => {
    const shufflecards = [...places]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card }));
    setPlaces(shufflecards);
  };

  const handleMapGuess = (event) => {
    if (start == 'Start') {
      shuffle();
      setRoc('Reset');
      setDisable(true) 
      setOpacity(0.0)     
      setStart('Guess');
    } else if (start == 'Guess') {
      setDisable(true)
      setShowMarker(true);
      setOpacity(1.0)
      setLocationlong(selectedLocation.latitude);
      setLocationlat(selectedLocation.longitude);
      const tempDis = Math.floor(
        getDistance(
          {
            latitude: selectedLocation.latitude,
            longitude: selectedLocation.longitude,
          },
          {
            latitude: places[count].latitude,
            longitude: places[count].longitude,
          }
        )
      );
      setDis(tempDis);
      const newScore = Math.floor(tempDis / 1000 + score);
      setScore(newScore);

      setRoc('Continue');

      if (count == 9) {
        setRoc('Finish');
      }
    }
  };

  const handleContinue = () => {
    setSelectedLocation(null);
    setRoc('Reset');
    setShowMarker(false)
    setCount(0)
    if (count < 9) {
      setCount(count + 1);
    }
  };

  return (
    <View style={styles.container}>
      <MapView
        
        style={styles.map}
        initialRegion={usaRegion}
        region={
          selectedLocation
            ? {
                latitude: selectedLocation.latitude,
                longitude: selectedLocation.longitude,
                latitudeDelta: 45,
                longitudeDelta: 45,
              }
            : usaRegion
        }
        maxDelta={45}
        onPress={handleMapPress}>
        {selectedLocation && (
          
          <Marker
            coordinate={{
              latitude: selectedLocation.latitude,
              longitude: selectedLocation.longitude,
            }}
            onRegionChangeComplete={(region) => setRegion(region)}
            pinColor = '#9c8c84'
          />
        )}
        {showMarker && (
        <Marker
          coordinate={{
            latitude: places[count].latitude,
            longitude: places[count].longitude,
          }}
          opacity = {opacity}
          onRegionChangeComplete={(region) => setRegion(region)}
          pinColor='#3b3c36'
        />
        
        
        )}
      </MapView>
      <View style={styles.imageContainer}>
        <Image source={places[count].img} style={styles.image} />
      </View>
      <TouchableOpacity style={styles.guessButton} onPress={handleMapGuess} disabled = {disable}>
        <Text style={styles.guessButtonText}>{start}</Text>
      </TouchableOpacity>
      <View style={styles.buttonContainer}>
        {selectedLocation ? (
          <TouchableOpacity
            style={styles.resetButton}
            onPress={() => {
              roc == 'Finish'
                ? navigation.navigate('FinalScreen', { score })
                : handleContinue();
                setDisable(true)
            }}>
            <Text style={styles.resetButtonText}>{roc}</Text>
          </TouchableOpacity>
        ) : (
          <Text style={styles.instructionsText}>
            Tap on the map to select a location in the USA.
          </Text>
        )}
        <Text style={styles.text}>Current Score: {score}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backroundColor: '#cdbcb1',
  },
  map: {
    width: '100%',
    height: '50%',
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    alignItems: 'center',
    padding: 20,
  },
  instructionsText: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  resetButton: {
    backgroundColor: '#625d5d',
    padding: 10,
    borderRadius: 10,
    borderWidth: 0,
    borderColor: '#000',
  },
 guessButton: {
    backgroundColor: '#3b3c36',
    padding: 20,
    borderRadius: 100,
    borderWidth: 0.5,
    borderColor: '#3b3c36',
  },
  guessButtonText: {
    fontSize: 40,
    color: '#e3e1d4',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  resetButtonText: {
    fontSize: 25,
    color: '#e3e1d4',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  image: {
    width: 300,
    height: 200,
    marginLeft: 50,
    marginTop: 10,
    marginBottom: 10,
    alignItems: 'center',
  },
});

export default MapGuesser;
