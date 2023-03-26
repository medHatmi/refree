import React, { useContext, useState } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import FloatingInput from './components/FloatingInput';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContext } from '../API/AuthContext';


function ScoresScreen() {

  const [form, setForm] = useState({});
  const { sendScores } = useContext(AuthContext)

  const [score1, setScore1] = useState(0);
  const [score2, setScore2] = useState(0);

  const handleChange = React.useCallback((name, value) => {
    setForm({ 
      ...form, 
      [name]: value 
    });
  }, [form]);
  
  const handleSave = () =>{
    sendScores(form, score1, score2);
    setForm({});
    setScore1(0)
    setScore2(0)
  }

  const incrementNumber1 = () => {
    const newScore = score1 + 1;
    setScore1(newScore);
  }

  const decrementNumber1 = () => {
    const newScore = score1 - 1;
    setScore1(newScore);
  }

  const incrementNumber2 = () => {
    const newScore = score2 + 1;
    setScore2(newScore);
  }

  const decrementNumber2 = () => {
    const newScore = score2 - 1;
    setScore2(newScore);
  }


  return (
    <View style={styles.gameConatiner}>

      <Text style={styles.title1}>Game Score</Text>
      <View style={styles.inputsContainer}>
        <FloatingInput onChangeText={(value) => handleChange("team1", value)} value={form.team1} label="Team 1" />
        <Text style={styles.title2}>VS</Text>
        <FloatingInput onChangeText={(value) => handleChange("team2", value)} value={form.team2}  label="Team 2" />
      </View>
      <View style={styles.scores} >
        {/* <ScoreBox label="Team 1" onNumberChange={handleScore1Change} value={score1}  style={styles.scoreBox} /> */}
        <View style={styles.containerBox}>
          <Text style={styles.label}>Team1</Text>
          <TouchableOpacity style={styles.button} onPress={incrementNumber1}>
            <Text style={styles.buttonText}>+</Text>
          </TouchableOpacity>
          <View style={styles.numberBox}>
            <Text style={styles.number}>{score1}</Text>
          </View>
          <TouchableOpacity style={styles.button} onPress={decrementNumber1}>
            <Text style={styles.buttonText}>-</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.scoreBoxSpace} />
        <View style={styles.containerBox}>
          <Text style={styles.label}>Team2</Text>
          <TouchableOpacity style={styles.button} onPress={incrementNumber2}>
            <Text style={styles.buttonText}>+</Text>
          </TouchableOpacity>
          <View style={styles.numberBox}>
            <Text style={styles.number}>{score2}</Text>
          </View>
          <TouchableOpacity style={styles.button} onPress={decrementNumber2}>
            <Text style={styles.buttonText}>-</Text>
          </TouchableOpacity>
        </View>
      </View>
      <TouchableOpacity onPress={handleSave} style={{ backgroundColor: '#00c0ef', borderRadius: 5, justifyContent: 'center', alignItems: 'center', width: '40%', height: 50, alignSelf: 'center', marginTop: 25 }}>
        <Text style={{ color: '#fff', fontWeight: 'bold', textAlign: 'center', fontSize: 14 }}>Save</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = {
  gameConatiner: {
    flex: 1,
    backgroundColor: '#F5FCFF',
    paddingTop: 120,
    paddingRight: 70,
    paddingLeft: 70,
  },
  title1: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#00c0ef'
  },
  title2:{
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 30,
  },
  inputsContainer: {
    width: '100%',
    marginTop: 30,
  },
  scores:{
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  scoreBox: {
    marginHorizontal: 40,
  },
  scoreBoxSpace: {
    width: 40,
  },
  containerBox: {
    marginTop: 35,
  },
  button: {
    borderRadius: 5,
    padding: 10,
    marginHorizontal: 10,
  },
  buttonText: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  numberBox: {
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  number: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  label:{
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#00c0ef'
  }
}

export default ScoresScreen