import React, { useState, useContext } from 'react';
import { Alert } from 'react-native';

import AuthContent from '../components/Auth/AuthContent';
import LoadingOverlay from '../components/ui/LoadingOverlay';
import { UserContext } from "../contexts/UsersContext";
import { login } from '../util/auth';

function LoginScreen({ navigation }) {
  const { user, setUser } = useContext(UserContext);
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  async function loginHandler({ akun }) {
    setIsAuthenticating(true);
    // console.log(username);
    // console.log(password);
    try {
      const user1 = await login(akun);
      console.log(user1);
      setUser(user1);
      console.log(user);
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
