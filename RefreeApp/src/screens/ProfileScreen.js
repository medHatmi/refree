import React, { useContext, useEffect, useState } from 'react'
import { View, Text, TouchableOpacity, TextInput } from 'react-native'
import { AuthContext } from '../API/AuthContext';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Toast from 'react-native-toast-message';



function ProfileScreen({ navigation }) {
    const [hidePassword, setHidePassword] = useState(true);
    const [isUpdatingPassword, setIsUpdatingPassword] = useState(false);
    
    const isEditable = true;
    
    const {user, resetPassword, toastPassword, logout} = useContext(AuthContext)
    // console.log(user);
    const [form, setForm] = useState({})
    
    const toggleHidePassword = () => {
        setHidePassword(!hidePassword);
      };
    const handleChange = React.useCallback((name, value) => {
        setForm({ 
          ...form, 
          [name]: value 
        });
      }, [form]);



      
      useEffect(() => {
        if (toastPassword) {
          setIsUpdatingPassword(false);
          Toast.show({
            type: toastPassword === 'Password updated successfully' ? 'success' : 'error',
            text1: 'Update Password',
            text2: toastPassword,
            autoHide: true,
            visibilityTime: 2000,
            position: 'top',
            topOffset: '50',
          });
        }
      }, [toastPassword]);
      
      const handleUpdate = async () => {
        setIsUpdatingPassword(true);
        await resetPassword(form);
        setForm({});
      };
      
      
    const handleLogOut = () => {
      logout()
    }

  return (
    <View style={styles.ProfileContainer} >
    <Toast />
        <Text style={styles.title}>Profile</Text>

        <View style={{marginTop:70, marginBottom:50}} >
            <TextInput
                style={[styles.input, isEditable && styles.disabledInput]}
                placeholder="Type here"
                value={user?.details.fullName}
                editable={false}
            />
            <TextInput
                style={[styles.input, isEditable && styles.disabledInput]}
                placeholder="Type here"
                value={user?.details.email}
                editable={false}
            />
            <View style={styles.passwordContainer}>
                <TextInput
                    style={styles.passwordInput}
                    placeholder="Type your old password"
                    secureTextEntry={hidePassword}
                    onChangeText={(value) => handleChange("oldPassword", value)}
                    value={form.oldPassword}
                />
                <TouchableOpacity onPress={toggleHidePassword} style={styles.iconContainer}>
                    <Icon name={hidePassword ? 'visibility-off' : 'visibility'} size={20} />
                </TouchableOpacity>
            </View>
            <View style={styles.passwordContainer}>
                <TextInput
                    style={styles.passwordInput}
                    secureTextEntry={hidePassword}
                    placeholder="Type your new password"
                    onChangeText={(value) => handleChange("newPassword", value)}
                    value={form.newPassword}
                />
                <TouchableOpacity onPress={toggleHidePassword} style={styles.iconContainer}>
                    <Icon name={hidePassword ? 'visibility-off' : 'visibility'} size={20} />
                </TouchableOpacity>
            </View>
        </View>

        <View style={{flexDirection: 'row',justifyContent: 'center', marginHorizontal: 10}}>
            <TouchableOpacity onPress={handleUpdate} disabled={isUpdatingPassword} style={{ backgroundColor: '#00c0ef', borderRadius: 5, justifyContent: 'center', alignItems: 'center', width: '55%', height: 50, alignSelf: 'center', marginTop: 25, marginRight:15 }}>
                <Text style={{ color: '#fff', fontWeight: 'bold', textAlign: 'center', fontSize: 14 }}>update password</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleLogOut} style={{ backgroundColor: '#00c0ef', borderRadius: 5, justifyContent: 'center', alignItems: 'center', width: '40%', height: 50, alignSelf: 'center', marginTop: 25 }}>
                <Text style={{ color: '#fff', fontWeight: 'bold', textAlign: 'center', fontSize: 14 }}>Logout</Text>
            </TouchableOpacity>
        </View>


    </View>
  )
}

const styles = {

    ProfileContainer: {
        flex: 1,
        backgroundColor: '#F5FCFF',
        paddingTop: 120,
        paddingRight: 60,
        paddingLeft: 60,
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#00c0ef'
    },
    input: {
        width: '100%',
        borderWidth: 1,
        borderColor: '#d3d3d3',
        paddingHorizontal: 10,
        paddingVertical: 20,
        borderRadius: 5,
        marginTop:25
    },
    disabledInput: {
        backgroundColor: '#F0F0F0',
      },
      passwordContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        paddingVertical: 10,
        borderColor: '#d3d3d3',
        marginTop:25

      },
      passwordInput: {
        flex: 1,
        height: 40,

      },
      iconContainer: {
        padding: 10,
      },
}

export default ProfileScreen