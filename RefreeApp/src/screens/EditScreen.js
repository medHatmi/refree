import React, { useContext, useState } from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import { AuthContext } from '../API/AuthContext';
import FloatingInput from './components/FloatingInput';

function EditScreen({ navigation, route }) {

    const {updateScore} = useContext(AuthContext)
    const [form, setForm] = useState({});
    const {score} = route.params;
    // console.log(score);
    const [score1, setScore1] = useState(score.score1);
    const [score2, setScore2] = useState(score.score2);
    const [team1, setTeam1] = useState(score.team1);
    const [team2, setTeam2] = useState(score.team2);

    const handleCancel = () =>{
        navigation.goBack();
    }

    const handleUpdate = () =>{
      const updatedScore = { ...score, score1, score2, team1, team2 };
      updateScore(updatedScore);
        
    }

    const handleChange = React.useCallback((name, value) => {
        setForm({ 
          ...form, 
          [name]: value 
        });
      }, [form]);

      const incrementNumber1 = () => {
        setScore1(score1 + 1);
      }
      
      const decrementNumber1 = () => {
        setScore1(score1 - 1);
      }
      
      const incrementNumber2 = () => {
        setScore2(score2 + 1);
      }
      
      const decrementNumber2 = () => {
        setScore2(score2 - 1);
      }

      const handleTeam1Change = (newTeam1) => {
        setTeam1(newTeam1);
      };

      const handleTeam2Change = (newTeam2) => {
        setTeam2(newTeam2);
      };

  return (
    <View style={styles.EditContainer} >
        <Text style={styles.title1}>Game Score Update</Text>
        <View style={styles.inputsContainer}>
            <FloatingInput onChangeText={handleTeam1Change} value={team1} label="Team 1" />
            <Text style={styles.title2}>VS</Text>
            <FloatingInput onChangeText={handleTeam2Change} value={team2}  label="Team 2" />
        </View>

        <View style={styles.scores} >
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

        <View style={{flexDirection: 'row',justifyContent: 'center', marginHorizontal: 10}}>
            <TouchableOpacity onPress={handleCancel} style={{ backgroundColor: '#00c0ef', borderRadius: 5, justifyContent: 'center', alignItems: 'center', width: '40%', height: 50, alignSelf: 'center', marginTop: 25, marginRight:15 }}>
                <Text style={{ color: '#fff', fontWeight: 'bold', textAlign: 'center', fontSize: 14 }}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleUpdate} style={{ backgroundColor: '#00c0ef', borderRadius: 5, justifyContent: 'center', alignItems: 'center', width: '40%', height: 50, alignSelf: 'center', marginTop: 25 }}>
                <Text style={{ color: '#fff', fontWeight: 'bold', textAlign: 'center', fontSize: 14 }}>Update</Text>
            </TouchableOpacity>
        </View>
    </View>
  )
}

const styles ={
    EditContainer : {
        flex: 1,
        backgroundColor: '#F5FCFF',
        paddingTop: 120,
        paddingRight: 60,
        paddingLeft: 60,
    },
    title1: {
        fontSize: 32,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#00c0ef',
        marginBottom:20
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
        justifyContent: 'center',
        marginTop:20
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

export default EditScreen