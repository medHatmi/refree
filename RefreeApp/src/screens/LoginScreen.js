import React, { useContext, useEffect, useState } from 'react';
import { Image, TextInput, View, TouchableOpacity, Text } from 'react-native';
import { AuthContext } from '../API/AuthContext';
import Toast from 'react-native-toast-message';
import Icon from 'react-native-vector-icons/MaterialIcons';



const LoginScreen = ({navigation}) => {
  const [form, setForm] = useState({});
  const [hidePassword, setHidePassword] = useState(true);
  const [isUpdatingPassword, setIsUpdatingPassword] = useState(false);

  const { login, toastLogin } = useContext(AuthContext);

  const toggleHidePassword = () => {
    setHidePassword(!hidePassword);
  };

  const handleChange = (name, value) => {
    setForm({ 
      ...form, 
      [name]: value 
    });
  }

  useEffect(() => {
    if (toastLogin) {
      setIsUpdatingPassword(false);
      Toast.show({
        type: toastLogin === 'Password updated successfully' ? 'success' : 'error',
        text1: 'Login Error',
        text2: toastLogin,
        autoHide: true,
        visibilityTime: 2000,
        position: 'top',
        topOffset: '70',
      });
    }
  }, [toastLogin]);
  

  const onLoginPress = async () => {
    setIsUpdatingPassword(true);
    await login(form);
  };

  return (
    <View style={styles.container}>
    <Toast />
      <Image
        source={require('../../assets/newLogo.png')}
        style={styles.logo}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={form.email}
        onChangeText={(value) => handleChange("email", value)}
      />
      <View style={styles.passwordContainer}>
        <TextInput
          style={styles.passwordInput}
          placeholder="Password"
          secureTextEntry={hidePassword}
          onChangeText={(value) => handleChange("password", value)}
          value={form.password}
        />
        <TouchableOpacity onPress={toggleHidePassword} style={styles.iconContainer}>
            <Icon name={hidePassword ? 'visibility-off' : 'visibility'} size={20} />
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.button} onPress={onLoginPress}>
        <Text style={styles.buttonText}>LOGIN</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = {
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F5FCFF',
  },
  logo: {
    width: 300,
    height: 210,
    marginBottom: 50,
    marginTop: -50
  },
  input: {
    width: 300,
    height: 50,
    padding: 10,
    marginBottom: 25,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
  },
  button: {
    width: 300,
    height: 50,
    marginBottom: 30,
    backgroundColor: '#00c0ef',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: 300,
    height: 50,
    padding: 10,
    marginBottom: 25,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
  },
  passwordInput: {
    flex: 1,
  }
};

export default LoginScreen;
