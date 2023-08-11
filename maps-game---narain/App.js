/* Map Guesser: Abandoned Buildings in America 
      by Narain

  Screen 1: WelcomeScreen
    User will open to the welcome screen and can either start the game or view the rules of the game. We used a Modal for the rules section to make the UI look better.

  Screen 2: Map Guesser 
    When the user presses Start, the places will shuffle and the game offically starts. The user will place a marker where they thing the building is and when they are ready, they will press guess. They can also press reset if they want to take our the marker they placed (Dark gray), but tapping in another location also works. Once they press guess, another marker will appear where the actual location is. In order to get the next picture, the user must press continue. There are a total of 10 images. The user's score adds up each time a picture is presented. The scoring rules can be found in the rules section but a quick way of explaining it is that the lower the score is, the better one does in the game.
    bugs: 
      -you can place a marker before starting the game but you will need to press start in order to guess
      -the image defaults to the first building in the list in it's initial state 
      -the pictures randomize after the user clicks start
      -if you click through the guess and continue button too quickly you may get an error 

  Screen 3: Final Screen
    This is where the final score is displayed to the user. The user will also have the option to play again which is basically going back to the welcome screen. 

*/


import { View, StyleSheet, TouchableOpacity, Text} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import WelcomeScreen from './WelcomeScreen';
import MapGuesser from './MapGuesser';
import FinalScreen from './FinalScreen';


const Stack = createNativeStackNavigator();

const GlobalGuesser = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false}}>           
   
   
           <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} />
      <Stack.Screen name="MapGuesser" component={MapGuesser} />  
         <Stack.Screen name="FinalScreen" component={FinalScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default GlobalGuesser;

