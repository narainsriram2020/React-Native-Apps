/* Limitataions: This app has all the basic features that a weather app should have. To start off, the user can enter in the latitiude and longitude of a certain location and then click submit. The text input on the phone is built so that one can actually access the whole keyboard but it is enocuraged that the users only use the negative sign, the "-" and the numbers provided and any other inputs will result in an error. Continually, the app also shows an error when the numbers exceed a certain point than what they can in terms of real longitude and latitiude. Once they hit submit, the app will fetch the information and display what is important. This includes: the City name, the current weather condition, the current temperature, current wind speed, the low temperature, the high temperature, and the humidity percentage. Along with this, the background of the app will change based on the current weather conditions. Backgrounds will change with certain weather conditions like snow, fog, rain, cloudy, sunny, thunderstorms and much more. Finally, once a user wants to enter in a new location, they can simply delete their current longitude and latitude numbers to enter in their new numbers. Overall, the app is aesthetically pleasing and works on the android simulator but the only problem is that the screen doesn't scroll which can cause for the last three pieces of information to not show up. Also, on all devices the user must hit the return button after entering in the values for the key-pad to dissappear. If they wish to re-enter any number in the text input then the the keyboard reappears.*/

import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, TextInput, TouchableOpacity, ImageBackground } from 'react-native';
import Constants from 'expo-constants';

export default function App() {
const API_KEY = '8d03326d222c202dbe9eadba9cde4031';
const [useranswer, setUseranswer] = useState("");
const [lat, setLat] = useState(0);
const [long, setLong] = useState(0);
const [daily, setDaily] = useState([]);
const [weather, setWeather] = useState(null)
const [error, setError] = useState(null);
const [location, setLocation] = useState([]);
const [forecast, setForecast] = useState(null);
const [refreshing, setRefreshing] = useState(false);
const [userlat, setUserlat] = useState("");
const [userlong, setUserlong] = useState("");
const [currentTemp, setCurrentTemp] = useState(0);
const [wind, setWind] = useState(0);
const [LowTemp, setLowTemp] = useState(0);
const [HighTemp, setHighTemp] = useState(0);
const [city, setCity] = useState('');
const [weatherImage, setWeatherImage] = useState("https://w0.peakpx.com/wallpaper/163/340/HD-wallpaper-miami-vice-beach-blue-gta-lights-miami-beach-nigth-northern-purple-sunset-thumbnail.jpg");

  const handleSubmit = () => {
    setUseranswer("");
    setLat("");
    setLong("");
    if (lat > 180 || lat < -180){
      setLat(0);
    }
    if (long > 90 || long < -90){
      setLong(0);
    }

  }

  function test(){
    fetch('https://api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon=' + long + '&appid=da5f06a7a1567b823d685052ed30635a&units=imperial')
    .then((response) => response.json())
    .then((data) => {
      console.log(data)
      setWeather(data)
      weatherIcon(data.weather[0].main);
    })
  }

   function weatherInfo() {
      return fetch ('https://api.openweathermap.org/data/2.5/weather?lat=' + parseFloat(text).toFixed(6) + '&lon=' +  parseFloat(textTwo).toFixed(6) + '&appid=da5f06a7a1567b823d685052ed30635a&units=Imperial')
      .then(response=>response.json())
      .then(data => {
        setCurrentTemp(data.main.temp);
        setWind(data.wind.speed);
        setLowTemp(data.main.temp_min);
        setHighTemp(data.main.temp_max);
        setCity(data.main.location);
        setWeatherCurrentImage(weather.weather[0].main);
      })
      .catch((error) => {
      console.error(error);
    });
   }

   function weatherIcon (icon) {
     console.log(icon)
    if (icon == "Clouds"){
      setWeatherImage("https://images.unsplash.com/photo-1612297728955-a0ad12a75df9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8Y2xvdWR5JTIwd2VhdGhlcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60");
    }
    else if (icon == "Thunderstorm"){
      setWeatherImage("https://images.unsplash.com/photo-1561485132-59468cd0b553?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8dGh1bmRlcnN0b3JtJTIwd2VhdGhlcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60");
    }
    else if (icon == "Drizzle"){
      setWeatherImage("https://images.unsplash.com/photo-1629724769029-7e086b821a6b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8ZHJpenpsZSUyMHdlYXRoZXJ8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60");
    }
    else if (icon == "Rain"){
      setWeatherImage("https://images.unsplash.com/photo-1613739118925-cde1e8f5d65b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OXx8cmFpbiUyMHdlYXRoZXJ8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60");
    }
    else if (icon == "Snow"){
      setWeatherImage("https://images.unsplash.com/photo-1578404421680-c4f8f3be26f4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTZ8fHNub3clMjB3ZWF0aGVyfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60");
    }
    else if (icon == "Clear"){
      setWeatherImage("https://images.unsplash.com/photo-1606170034961-ee40e2dbe6bf?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8c3VubnklMjB3ZWF0aGVyfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60");
    }
    else if (icon == "Fog"){
      setWeatherImage("https://images.unsplash.com/photo-1487621167305-5d248087c724?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8Zm9nfGVufDB8fDB8fA%3D%3D&w=1000&q=80");
    }
    else{
      setWeatherImage("https://w0.peakpx.com/wallpaper/163/340/HD-wallpaper-miami-vice-beach-blue-gta-lights-miami-beach-nigth-northern-purple-sunset-thumbnail.jpg");
    }
  }

  const handleGetWeather = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      return setError("Permission to access location was denied.");
    } else {
      const {
        coords: { latitude, longitude },
      } = await Location.getCurrentPositionAsync({ accuracy: 5 });
      const location = await Location.reverseGeocodeAsync({ latitude, longitude }, { useGoogleMaps: false });
      const data = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=alerts&appid=${API_KEY}&units=metric`);
      const json = await data.json();
      setLocation(location[0]);
      setDaily(json.daily);
    }
  };

  useEffect(() => {
    function weatherInfo(){
    }
  }, []);


  return (
    <View style={styles.container}>
      <View style={{justifyContent: 'center', flex: 1, backgroundColor: '#ffffff'}}>
      <ImageBackground
            source={{ uri: weatherImage}} 
            style={styles.image}>
      <View style={{marginTop: 100}}>
      <TextInput
          style={styles.textInputStyle}
          placeholder="Enter Latitude"
          placeholderTextColor="white"
          keyboardType={'numbers-and-punctuation'}
          value = {lat}
          onChangeText={(x) => setLat(x)}
        />
        <Text> </Text>
        <TextInput
          style={styles.textInputStyle}
          placeholder="Enter Longitude"
          placeholderTextColor="white"
          keyboardType={'numbers-and-punctuation'}
          value = {long}
          onChangeText={(x) => setLong(x)}
        />
        <TouchableOpacity onPress={() => test()}>
        <Text
          style={{
            justifyContent: 'center',
            fontSize: 50,
            color: 'black',
            padding: 10,
            alignSelf: 'center',
            marginTop: 10,
          }}>
          Submit
        </Text>
      </TouchableOpacity>
      <Text
          style={{
            justifyContent: 'center',
            fontSize: 65,
            color: 'white',
            padding: 10,
            alignSelf: 'center',
            marginTop: 10,
          }}>
          {weather == null ? 'N/A' : weather.name}
      </Text>
      <Text
          style={{
            justifyContent: 'center',
            fontSize: 50,
            color: 'white',
            padding: 10,
            alignSelf: 'center',
            marginTop: 1,
          }}>
          {weather == null ? 'N/A' : weather.weather[0].description}
      </Text>
      <Text
          style={{
            justifyContent: 'center',
            fontSize: 80,
            color: 'white',
            padding: 10,
            alignSelf: 'center',
            marginTop: 10,
          }}>
          {weather == null ? 'N/A' : weather.main.temp} °F
      </Text>
      <Text
          style={{
            justifyContent: 'center',
            fontSize: 20,
            color: 'white',
            padding: 10,
            alignSelf: 'center',
            marginTop: 50,
          }}>
          Wind: {weather == null ? 'N/A' : weather.wind.speed} mph
      </Text>
      <Text
          style={{
            justifyContent: 'center',
            fontSize: 20,
            color: 'white',
            padding: 10,
            alignSelf: 'center',
            marginTop: -10,
          }}>
          Low Temperature: {weather == null ? 'N/A' : weather.main.temp_min} °F
      </Text>
      <Text
          style={{
            justifyContent: 'center',
            fontSize: 20,
            color: 'white',
            padding: 10,
            alignSelf: 'center',
            marginTop: -10,
          }}>
          High Temperature: {weather == null ? 'N/A' : weather.main.temp_max} °F 
      </Text>
      <Text
          style={{
            justifyContent: 'center',
            fontSize: 20,
            color: 'white',
            padding: 10,
            alignSelf: 'center',
            marginTop: -10,
          }}>
          Humidity: {weather == null ? 'N/A' : weather.main.humidity}% 
      </Text>
      </View>
      </ImageBackground>
      </View>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#ffffff',
    padding: 8,
  },
  textInputStyle: {
    width: 250,
    backgroundColor: '#f98dc9',
    padding: 16,
    alignSelf: 'center'
  },
  image: {
    flex: 0,
    width: '105%',
    height: '105%',
    resizeMode: 'contain',
    alignSelf: 'center'
  },
});

