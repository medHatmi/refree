import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import ScoresScreen from "../ScoresScreen";
import Home from "../Home";
import { StyleSheet, View, Image, Text, TouchableOpacity } from "react-native";
import IconAntDesign from 'react-native-vector-icons/AntDesign';
import IconMaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import ScoresHistoryScreen from "../ScoresHistoryScreen";
import ProfileScreen from "../ProfileScreen";

const Tab = createBottomTabNavigator();

function GameTabScreen() {
  return (
    <Tab.Navigator   
      screenOptions={{
        headerShown: false,
        "tabBarShowLabel":false,
        "tabBarStyle":[
            {
                position:"absolute",
                // bottom: 25,
                // left: 20,
                // right: 20,
                paddingRight:15,
                paddingLeft:15,
                elevation: 0,
                backgroundColor: "#ffffff",
                borderRadius: 15,
                height:110,
                ...styles.shadow
            }
        ]
      }}
    >

      <Tab.Screen 
        name="ScoresScreen" 
        component={ScoresScreen}
        options={{
            tabBarIcon: ({focused}) => (
                <View style={{alignItems:'center', top:10}} >
                    <IconMaterialCommunityIcons style={{color: focused ? '#00c0ef' : '#aaa', paddingBottom:10}} name="scoreboard-outline" size={35}  />
                    <Text style={{color: focused ? '#00c0ef' : '#aaa',fontSize: 14,fontWeight: 'bold'}}>Game Scores</Text>
                </View>
            )
            }}
        />
        <Tab.Screen 
        name="Scores" 
        component={ScoresHistoryScreen}
        options={{
            tabBarIcon: ({focused}) => (
                <View style={{alignItems:'center', top:10}} >
                    <IconMaterialCommunityIcons style={{color: focused ? '#00c0ef' : '#aaa', paddingBottom:10}} name="history" size={35}  />
                    <Text style={{color: focused ? '#00c0ef' : '#aaa',fontSize: 14,fontWeight: 'bold'}}>Scores History</Text>
                </View>
            )
            }}
        />
        <Tab.Screen 
            name="Profile" 
            component={ProfileScreen}
            options={{
                tabBarIcon: ({focused}) => (
                    <View style={{alignItems:'center', top:10}} >
                        <IconAntDesign style={{color: focused ? '#00c0ef' : '#aaa', paddingBottom:10}} name="user" size={35}  />
                        <Text style={{color: focused ? '#00c0ef' : '#aaa',fontSize: 14,fontWeight: 'bold'}}>Profile</Text>
                    </View>
                )
                }}
        />

    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
    shadow:{
        shadowColor:"#7F5DF0",
        shadowOffset:{
            width:0,
            height:10,
        }
    }
})

export default GameTabScreen;
