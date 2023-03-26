import React, { useContext } from 'react';
import { AuthContext } from '../../API/AuthContext';
import GameTabScreen from '../Tabs/GameTabScreen';
import WelcomeScreen from '../WelcomeScreen';


function PrivateGameTabScreen() {
    const { user } = useContext(AuthContext);
  
    if (!user) {
      // redirect to the WelcomeScreen if the user is not authenticated
      return <WelcomeScreen />;
    }
  
    // render the GameTabScreen component if the user is authenticated
    return <GameTabScreen />;
  }

  
export default PrivateGameTabScreen;
