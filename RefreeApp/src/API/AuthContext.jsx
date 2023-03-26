import React, { createContext, useEffect, useState } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from "axios";
import { useNavigation } from '@react-navigation/native';

export const AuthContext = createContext();

export const AuthProvider = (props) => {

  const [user, setUser] = useState(null);
  const [allScores, setAllScores] = useState([]);
  const [toastPassword, setToastPassword] = useState("")
  const [toastLogin, setToastLogin] = useState("")

 
  const removeItemValue = React.useCallback(async (key) => {
    try {
      await AsyncStorage.removeItem(key);
      console.log(`Item ${key} removed from AsyncStorage`);
    } catch (error) {
      console.error(`Error removing item ${key} from AsyncStorage: ${error}`);
    }
  }, []);

  const getUser = async () => {
    try {
      const value = await AsyncStorage.getItem('user');
      if (value !== null) {
        setUser(JSON.parse(value));
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  const register = (data) => {
    console.log(data);
    axios
    .post("http://10.0.0.251:8800/auth/register", {
      fullName: data.fullName,
      email: data.email,
      password: data.password,
    })
    .then((res) => {
      console.log(res);
      navigation.navigate('Login');
    })
    .catch((err) => {
      console.log(err);
    });
  };

  const navigation = useNavigation(); 
  const login = (data) => {
    
    axios
      .post("http://10.0.0.251:8800/auth/login", {
        email: data.email,
        password: data.password,
      })
      .then((res) => {
        AsyncStorage.setItem('user', JSON.stringify(res.data));
        getUser();
        navigation.navigate('PrivateGameTabScreen', {
          screen: 'ScoresScreen'
        });

      })
      .catch((error) => {
        // console.log(error.response.data.message);
        setToastLogin(error.response.data.message);
      });
  };

  const logout = () => {
    removeItemValue('user')
    setUser(null)
    navigation.navigate('Welcome')
  }

  const resetPassword = async (data) => {
    try {
      const id = user?.details._id;
      const token = user?.token;
      const response = await axios.post('http://10.0.0.251:8800/auth/resetPassword', {
        user_id: id,
        oldPassword: data.oldPassword,
        newPassword: data.newPassword
      }, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
  
      setToastPassword(response.data.message);
    } catch (error) {
      if (error.response && error.response.status === 401) {
        console.log('Invalid token');
        setToastPassword('Invalid token');
      } else {
        // console.log(error);
        setToastPassword(error.response.data.message);
      }
    }
  };

  const sendScores = async (teams, score1, score2) => {
    try {
      const id = user?.details._id;
      const token = user?.token;
      const response = await axios.post('http://10.0.0.251:8800/scores/saveScore', {
        ref: id,
        team1: teams.team1,
        team2: teams.team2,
        score1: score1,
        score2: score2,
      }, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
  
      console.log(response.data);
      scores();
      navigation.navigate('Scores');
    } catch (error) {
      if (error.response && error.response.status === 401) {
        // Handle invalid token error
        console.log('Invalid token');
      } else {
        // Handle other errors
        console.log(error);
      }
    }
  };

  const updateScore = async (score) => {
    const token = user?.token;
    try {
      const response = await axios.put('http://10.0.0.251:8800/scores/updateScore', {
        id: score._id,
        team1: score.team1,
        team2: score.team2,
        score1: score.score1,
        score2: score.score2,
      }, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
  
      console.log(response.data);
      scores();
      navigation.navigate('Scores');
    } catch (error) {
      if (error.response && error.response.status === 401) {
        // Handle invalid token error
        console.log('Invalid token');
      } else {
        // Handle other errors
        console.log(error);
      }
    }
  }
  
  
  const scores = async () => {
    try {
      const token = user?.token;
      if (!token) {
        console.log('No token available');
        return;
      }
      const response = await axios.get('http://10.0.0.251:8800/scores/scores', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const data = response.data;
      setAllScores(data);
    } catch (error) {
      console.log(error);
      // handle the error
    }
  }
  
  useEffect(() => {
    scores();
  }, [user]);


  async function deleteScore(id) {
    try {
      const token = user?.token;
      if (!token) {
        console.log('No token available');
        return;
      }
      const response = await fetch(`http://10.0.0.251:8800/scores/delete/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await response.json();
      console.log(data);
      scores();
    } catch (error) {
      console.error(error);
    }
  }
  





  return (
    <AuthContext.Provider value={{ register, login, user, sendScores, scores, allScores, deleteScore, resetPassword, toastPassword, updateScore, logout, toastLogin }}>
        {props.children}
    </AuthContext.Provider>
  );
};
