import React, { useContext } from 'react'
import { View, Text, ScrollView } from 'react-native'
import IconMaterialIcons from 'react-native-vector-icons/MaterialIcons';
import IconAntDesign from 'react-native-vector-icons/AntDesign';
import { AuthContext } from '../API/AuthContext';


function ScoresHistoryScreen({navigation}) {

  const {allScores, deleteScore} = useContext(AuthContext)

  const handleDelete = (gameId) =>{
    deleteScore(gameId);
  }

  const handleEdit = (score) => {
    navigation.navigate("EditScreen", { score: score });
  }

  return (
    <ScrollView style={styles.historyContainer}>
      <Text style={styles.title}>Scores History</Text>
      <View style={{ borderBottomWidth: 1, borderBottomColor: 'grey', marginTop:40 }} />

      {allScores.map((score) => (
        <React.Fragment key={score._id}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop:20, marginBottom: 20, paddingRight: 30, paddingLeft: 30, }}>
            <View style={{ marginRight: 20, alignItems: 'center' }}>
              <Text style={styles.texts}>{score.team1}</Text>
              <Text>{score.score1}</Text>
            </View>
            <Text style={styles.texts}>:</Text>
            <View style={{ marginLeft: 20, alignItems: 'center' }}>
              <Text style={styles.texts}>{score.team2}</Text>
              <Text>{score.score2}</Text>
            </View>
            <IconMaterialIcons style={{ marginLeft: 20}} size={22} name='edit' color='#d9c545' onPress={() => handleEdit(score)} />
            <View style={{ height: '70%', borderLeftWidth: 1, borderLeftColor: 'gray' }} />
            <IconAntDesign size={22} name='delete' color='#b50d0d' onPress={() => handleDelete(score._id)}/>
          </View>

          <View style={{ borderBottomWidth: 1, borderBottomColor: 'grey' }} />
        </React.Fragment>

      ))}



    </ScrollView>
  )
}


const styles = {
  historyContainer: {
    flex: 1,
    backgroundColor: '#F5FCFF',
    paddingTop: 120,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#00c0ef'
  },
  texts: {
    fontSize: 18,
    fontWeight: 'bold',
  }
}

export default ScoresHistoryScreen;