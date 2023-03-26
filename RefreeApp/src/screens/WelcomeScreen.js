import React, { useContext } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { AuthContext } from "../API/AuthContext";

const WelcomeScreen = ({ navigation }) => {
  const { user } = useContext(AuthContext);
  return (
    <View style={styles.container}>
    <Image
        source={require('../../assets/refreeRuning.jpg')}
        style={styles.logo}
      />
      {/* <Text style={styles.welcomeText}>Welcome Back Refree! <MaterialCommunityIcons name="whistle" size={24} color="black" /></Text> */}

    {
      user ?
      <View>
     <TouchableOpacity
            style={styles.buttonContainer}
            onPress={() => navigation.navigate("PrivateGameTabScreen")}
        >
            <Text style={styles.buttonText}>Let's Go!</Text>
        </TouchableOpacity>
     </View>
        :
        <View style={styles.bigButtonContainer}>
        <TouchableOpacity
            style={styles.buttonContainer}
            onPress={() => navigation.navigate("Login")}
        >
            <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity
            style={styles.buttonContainer}
            onPress={() => navigation.navigate("Register")}
        >
            <Text style={styles.buttonText}>Register</Text>
        </TouchableOpacity>
     </View>
    }

    </View>
  );
};



const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor:"white"
  },
  bigButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  logo: {
    width: 400,
    height: 430,
    marginBottom: 50,
    marginTop: -50
  },
  welcomeText: {
    fontSize: 25,
    marginBottom: 20,
    textAlign: "center",
  },
  buttonContainer: {
    width: "40%",
    padding: 15,
    backgroundColor: "#00c0ef",
    margin: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
  },
});

export default WelcomeScreen;