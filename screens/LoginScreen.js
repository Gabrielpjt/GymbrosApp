import React, { useState, useContext } from 'react';
import { Alert } from 'react-native';

import AuthContent from '../components/Auth/AuthContent';
import LoadingOverlay from '../components/ui/LoadingOverlay';
import { UsersContext } from "../contexts/UsersContext";
import { login } from '../util/auth';

function LoginScreen({ navigation }) {
  const { setUsers } = useContext(UsersContext);
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  async function loginHandler({ username, password }) {
    setIsAuthenticating(true);
    console.log(username);
    console.log(password);
    try {
      const user = await login(username, password);
      console.log(user);
      setUsers(user);
      navigation.replace('App', { screen: 'Home' });
    } catch (error) {
      Alert.alert('Error', 'Authentication failed!');
    }

    setIsAuthenticating(false);
  }

  if (isAuthenticating) {
    return <LoadingOverlay message="Logging you in..." />;
  }

  return <AuthContent isLogin={true} onAuthenticate={loginHandler} />;
}

export default LoginScreen;
