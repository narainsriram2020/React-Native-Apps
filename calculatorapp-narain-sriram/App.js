import React, { useState} from 'react';
import { Text, View, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import Constants from 'expo-constants';

// You can import from local files
import AssetExample from './components/AssetExample';

// or any pure javascript modules available in npm
import { Card } from 'react-native-paper';

export default function App() {

  const [input, setInput] = useState("Calculator output");
  const [buttonDisable, setButtonDisabled] = useState(false);
  const [answered, setAnswered] = useState(false);

  const [firstNumber, setFirstNumber] = useState("");
  const [secondNumber, setSecondNumber] = useState("");
  const [operation, setOperation] = useState("");
  const [result, setResult] = useState("")//<Number | null>(null);

  const handleNumberPress = (buttonValue: string) => {
    if (!answered){
      setResult(result => result + buttonValue);
      if (firstNumber.length < 10) {
        setFirstNumber(firstNumber + buttonValue); 
      }
    }
    else{
      setResult(result => "" + buttonValue);
      if (firstNumber.length < 10) {
        setFirstNumber(firstNumber + buttonValue); 
      }
      setAnswered(false);
    }
  };
  const handleOperationPress = (buttonValue: string) => {
    if (!answered){
      setButtonDisabled(true);
      setResult(result => result + buttonValue);
      setOperation(result => result + buttonValue);
      setSecondNumber(firstNumber);
      setFirstNumber("")
    }
    else{
      setButtonDisabled(true);
      setResult(result => result + buttonValue);
      setOperation(result => result + buttonValue);
      setSecondNumber(firstNumber);
      setFirstNumber("")
    }
  };
  
  const clear = () => {
    setButtonDisabled(false);
    setFirstNumber("");
    setSecondNumber("");
    setOperation("");
    setResult("");
    //setFirstNumber(result)
  };

  const getResult = () => {
    setAnswered(true);
    let temp = 0;
    switch (operation) {
      case "+":
        clear();
        clear();
        temp = parseFloat(secondNumber) + parseFloat(firstNumber);
        setResult(temp);
        setFirstNumber(temp);
        break;
      case "-":
        clear();
        clear();
        temp = parseFloat(secondNumber) - parseFloat(firstNumber);
        setResult(temp);
        setFirstNumber(temp);
        break;
       case "^":
        clear();
        clear();
        temp = parseFloat(secondNumber) ** parseFloat(firstNumber);
        setResult(temp);
        setFirstNumber(temp);
        break;
      case "*":
        clear();
        clear();
        temp = parseFloat(secondNumber) * parseFloat(firstNumber);
        setResult(temp);
        setFirstNumber(temp);
        break;
      case "%":
        clear();
        clear();
        temp = parseFloat(secondNumber) * 0.01;
        setResult(temp);
        setFirstNumber(temp);
        break;
      case "/":
        clear();
        clear();
        temp = parseFloat(secondNumber) / parseFloat(firstNumber);
        setResult(temp);
        setFirstNumber(temp);
        break;
      default:
        clear();
        clear();
        setResult("");
        break;
    }
    if (temp == "Infinity"){
      setResult("Undefined");
    }
  };


  return (
    <View style={styles.container}>
      <View style={{flex: 2, color: 'white', backgroundColor: 'black'}}>
        <Text style={{color: "white", textAlign: 'right', marginTop: 175, justifyContent: 'center', fontSize: 110}}>{result}</Text>
      </View>
      <View style={{flex: 4, backgroundColor: 'black'}}>
      
        <View style={{flexDirection: 'row', flex: 1, alignSelf: 'center'}}>
          <TouchableOpacity // for ac
          style={styles.touchableButtonGrey}
          onPress={clear}
          >
            <Text style={{textAlign: 'center', fontSize: 39, color: 'black'}}>AC</Text>
          </TouchableOpacity>

          <TouchableOpacity // for ^
          disabled={buttonDisable}
          style={styles.touchableButtonGrey}
          onPress={() => handleOperationPress("^")} 
          >
          <Text style={{textAlign: 'center', fontSize: 39, color: 'black'}}>^</Text>
          </TouchableOpacity>

          <TouchableOpacity // for %
          disabled={buttonDisable}
          style={styles.touchableButtonGrey}
          onPress={() => handleOperationPress("%")}
          >
          <Text style={{textAlign: 'center', fontSize: 39, color: 'black'}}>%</Text>
          </TouchableOpacity>
          <TouchableOpacity // for /
          disabled={buttonDisable}
          style={styles.touchableButtonOrange}
          onPress={() => handleOperationPress("/")}
          >
          <Text style={{textAlign: 'center', fontSize: 39, color: 'white'}}>/</Text>
          </TouchableOpacity>
        </View>

        <View style={{flexDirection: 'row', flex: 1}}>

          <TouchableOpacity // for 7
          style={styles.touchableButtonDarkGrey}
          onPress={() => handleNumberPress("7")}
          >
          <Text style={{textAlign: 'center', fontSize: 39, color: 'white'}}>7</Text>
          </TouchableOpacity>

          <TouchableOpacity // for 8
          style={styles.touchableButtonDarkGrey}
          onPress={() => handleNumberPress("8")}
          >
          <Text style={{textAlign: 'center', fontSize: 39, color: 'white'}}>8</Text>
          </TouchableOpacity>

          <TouchableOpacity // for 9
          style={styles.touchableButtonDarkGrey}
          onPress={() => handleNumberPress("9")}
          >
          <Text style={{textAlign: 'center', fontSize: 39, color: 'white'}}>9</Text>
          </TouchableOpacity>
          
          <TouchableOpacity // for *
          disabled={buttonDisable}
          style={styles.touchableButtonOrange}
          onPress={() => handleOperationPress("*")}
          >
          <Text style={{textAlign: 'center', fontSize: 39, color: 'white'}}>*</Text>
          </TouchableOpacity>
        </View>

        <View style={{flexDirection: 'row', flex: 1}}>

          <TouchableOpacity // for 4
          style={styles.touchableButtonDarkGrey}
          onPress={() => handleNumberPress("4")}
          >
          <Text style={{textAlign: 'center', fontSize: 39, color: 'white'}}>4</Text>
          </TouchableOpacity>

          <TouchableOpacity // for 5
          style={styles.touchableButtonDarkGrey}
          onPress={() => handleNumberPress("5")}
          >
          <Text style={{textAlign: 'center', fontSize: 39, color: 'white'}}>5</Text>
          </TouchableOpacity>

          <TouchableOpacity // for 6
          style={styles.touchableButtonDarkGrey}
          onPress={() => handleNumberPress("6")}
          >
          <Text style={{textAlign: 'center', fontSize: 39, color: 'white'}}>6</Text>
          </TouchableOpacity>

          <TouchableOpacity // for -
          disabled={buttonDisable}
          style={styles.touchableButtonOrange}
          onPress={() => handleOperationPress("-")}
          >
          <Text style={{textAlign: 'center', fontSize: 39, color: 'white'}}>-</Text>
          </TouchableOpacity>

        </View>

        <View style={{flexDirection: 'row', flex: 1}}>
          <TouchableOpacity // for 1
          style={styles.touchableButtonDarkGrey}
          onPress={() => handleNumberPress("1")}
          >
          <Text style={{textAlign: 'center', fontSize: 39, color: 'white'}}>1</Text>
          </TouchableOpacity>

          <TouchableOpacity // for 2
          style={styles.touchableButtonDarkGrey}
          onPress={() => handleNumberPress("2")}
          >
          <Text style={{textAlign: 'center', fontSize: 39, color: 'white'}}>2</Text>
          </TouchableOpacity>

          <TouchableOpacity // for 3
          style={styles.touchableButtonDarkGrey}
          onPress={() => handleNumberPress("3")}
          >
          <Text style={{textAlign: 'center', fontSize: 39, color: 'white'}}>3</Text>
          </TouchableOpacity>

          <TouchableOpacity // for +
          disabled={buttonDisable}
          style={styles.touchableButtonOrange}
          onPress={() => handleOperationPress("+")}
          >
          <Text style={{textAlign: 'center', fontSize: 39, color: 'white'}}>+</Text>
          </TouchableOpacity>

        </View>
        <View style={{flexDirection: 'row', flex: 1}}>
          <TouchableOpacity // for 0
          style={{width: '48%', height: '80%', backgroundColor: '#484645', alignSelf: 'center', borderRadius: 60, marginHorizontal: '1%', padding: 20,}}
          onPress={() => handleNumberPress("0")}
          >
          <Text style={{textAlign: 'center', fontSize: 39, color: 'white'}}>0</Text>
          </TouchableOpacity>

          <TouchableOpacity // for .
          style={styles.touchableButtonDarkGrey}
          onPress={() => handleNumberPress(".")}
          >
          <Text style={{textAlign: 'center', fontSize: 39, color: 'white'}}>.</Text>
          </TouchableOpacity>

          <TouchableOpacity // for =
          style={styles.touchableButtonOrange}
          onPress={() => getResult()}
          >
          <Text style={{textAlign: 'center', fontSize: 39, color: 'white'}}>=</Text>
          </TouchableOpacity>
        </View>
        <View style={{flex: 0.2}}>

        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
  },
  touchableButtonGrey: {
    width: '23%', 
    height: '80%', 
    backgroundColor: 'lightgrey',
    alignSelf: 'center',
    borderRadius: 60,
    marginHorizontal: '1%',
    padding: 20,
  },
  touchableButtonOrange: {
    width: '23%', 
    height: '80%', 
    backgroundColor: 'orange',
    alignSelf: 'center',
    borderRadius: 60,
    marginHorizontal: '1%',
    padding: 20,
  },
  touchableButtonDarkGrey: {
    width: '23%', 
    height: '80%', 
    backgroundColor: '#484645',
    alignSelf: 'center',
    borderRadius: 60,
    marginHorizontal: '1%',
    padding: 20,
  },


  /*buttons: {
    width: '17%',
    height: "10%",
    backgroundColor: 'orange',
    borderRadius: 100,
    top: -245,
    left: 250,
  },*/

 
});
