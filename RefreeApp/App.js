import { NavigationContainer } from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import LoginScreen from './src/screens/LoginScreen';
import RegisterScreen from './src/screens/RegisterScreen';
import WelcomeScreen from './src/screens/WelcomeScreen';
import GameTabScreen from './src/screens/Tabs/GameTabScreen';
import { AuthContext, AuthProvider } from './src/API/AuthContext';
import SplashScreenComponent from './SplashScreen';
import EditScreen from './src/screens/EditScreen';
import withAuth from './src/screens/routes/withAuth';

const Stack = createStackNavigator();

function App() {


  const PrivateEditScreen = withAuth(EditScreen);
  const PrivateGameTabScreen = withAuth(GameTabScreen);

  return (
    <>
      <SplashScreenComponent />
      <NavigationContainer >
        <AuthProvider> 
          <AuthContext.Consumer>
            {({ user }) => (
              <Stack.Navigator initialRouteName={user ? 'PrivateGameTabScreen' : 'Welcome'} screenOptions={{ headerShown: false }} >
                <Stack.Screen name="Welcome">
                  {(props) => <WelcomeScreen {...props} navigation={props.navigation} />}
                </Stack.Screen>
                <Stack.Screen name="Login" component={LoginScreen} />
                <Stack.Screen name="Register" component={RegisterScreen} />
                <Stack.Screen name="PrivateGameTabScreen" component={PrivateGameTabScreen} />
                <Stack.Screen name="EditScreen" component={PrivateEditScreen} />
              </Stack.Navigator>
            )}
          </AuthContext.Consumer>
        </AuthProvider>
    </NavigationContainer>
    </>
  );
}

export default App;