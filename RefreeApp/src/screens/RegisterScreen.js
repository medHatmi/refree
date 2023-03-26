import React, { useContext, useState } from 'react';
import { Image, TextInput, View, TouchableOpacity, Text } from 'react-native';
import { AuthContext } from '../API/AuthContext';
import Icon from 'react-native-vector-icons/MaterialIcons';


const RegisterScreen = () => {
  const [form, setForm] = useState({});
  const [hidePassword, setHidePassword] = useState(true);
  const { register } = useContext(AuthContext);

  const toggleHidePassword = () => {
    setHidePassword(!hidePassword);
  };

  const handleChange = (name, value) => {
    setForm({ 
      ...form, 
      [name]: value 
    });
  }
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [fullName, setFullName] = useState('');

  const onRegisterPress = () => {
    register(form);
  };

  return (
    <View style={styles.container}>
      <Image
            source={require('../../assets/newLogo.png')}
            style={styles.logo}
      />
      <TextInput
        style={styles.input}
        placeholder="Full name"
        value={form.fullName}
        onChangeText={(value) => handleChange("fullName", value)}
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
          secureTextEntry={hidePassword}
          placeholder="Password"
          value={form.password}
          onChangeText={(value) => handleChange("password", value)}
        />
        <TouchableOpacity onPress={toggleHidePassword} style={styles.iconContainer}>
            <Icon name={hidePassword ? 'visibility-off' : 'visibility'} size={20} />
        </TouchableOpacity>
      </View>
      <View style={styles.passwordContainer}>
        <TextInput
          style={styles.passwordInput}
          secureTextEntry={hidePassword}
          placeholder="Confirm Password"
          value={form.confirmPassword}
          onChangeText={(value) => handleChange("confirmPassword", value)}
        />
        <TouchableOpacity onPress={toggleHidePassword} style={styles.iconContainer}>
            <Icon name={hidePassword ? 'visibility-off' : 'visibility'} size={20} />
        </TouchableOpacity>
      </View> 
      <TouchableOpacity style={styles.button} onPress={onRegisterPress}>
        <Text style={styles.buttonText}>REGISTER</Text>
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
    marginBottom: 30,
    marginTop: -40,
  },
  input: {
    width: 300,
    height: 50,
    padding: 10,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
  },
  button: {
    width: 300,
    height: 50,
    backgroundColor: '#00c0ef',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    marginTop: 10,
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

export default RegisterScreen;
