import React, { useContext, useEffect, useState } from 'react';
import { Screen } from 'react-native-screens';
import { AuthContext } from '../../API/AuthContext';
import WelcomeScreen from '../WelcomeScreen';

const PrivateRoute = ({ name, component: Component }) => {
  const { user } = useContext(AuthContext);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    if (user) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, [user]);

  return isAuthenticated ? (
    <Screen name={name} component={Component} />
  ) : (
    <Screen name={name} component={WelcomeScreen} />
  );
};  

export default PrivateRoute;
