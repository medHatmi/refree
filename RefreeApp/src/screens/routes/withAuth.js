import React from 'react';
import { AuthContext } from '../../API/AuthContext';
import WelcomeScreen from '../WelcomeScreen';


const withAuth = (Component) => {
  return class extends React.Component {
    static contextType = AuthContext;

    render() {
      const { user } = this.context;
      if (!user) {
        return <WelcomeScreen />
      }
      return <Component {...this.props} />;
    }
  };
};

export default withAuth;
