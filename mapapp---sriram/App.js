/* 
  Screen 1: WelcomeScreen
    User will open to the welcome screen and can start the game by clicking the start button.

  Screen 2: MainMap
    On the bottom there are three buttons (from left to right): a turn button, a start and stop button and a finish button.
    The use of the turn button is so that whenever the user needs to turn they can click that button and all of the running stats at the top will update. Also when the button is cliked a marker will be placed and when there is more than one marker a polyline will be drawn between the two markers to help the runner identify the path that they have taken so far in their run. The turn button is disabled when the stopwatch is not running. Next is the start and stop button. This button allows the user to start and stop their runs. When the start button is pressed the user will have access to the turn button and the stopwatch will begin. When started the button will then change its icon to that of a stopwatch indicating the stop button. When the user hits the stop button, the stopwatch will stop and the user will be able to access the finish button. The finish button is diabled when the stopwatch is running and only works when it is not. The three different statistics at the top are the Total Distance traveled, Avg Speed and the number of Turns. These will all update when the turn button is pressed. 
    bugs:
      - the avg speed is 0 until 3 or 4 turns have been made. We do not know why this is but after 3 or 4 turns it works perfectly fine. 
      - the map dows not let you zoom in and out very far and is always stuck on the current location
      - the app doesn't work with android as all functionalities like zooming into the user's location does not occur
      - at the end of the app the user needs to reload it if they want to track another run
      

  Screen 3: FinalScreen
    This is where the final statistics of the run are displayed to the user.
*/




import { View, StyleSheet, TouchableOpacity, Text} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import WelcomeScreen from './WelcomeScreen';
import MainMap from './MainMap';
import FinalScreen from './FinalScreen';


const Stack = createNativeStackNavigator();

const MapApp = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false}}>  

 
      <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} />
        <Stack.Screen name="MainMap" component={MainMap} />           
    <Stack.Screen name="FinalScreen" component={FinalScreen} />
         
         
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MapApp;