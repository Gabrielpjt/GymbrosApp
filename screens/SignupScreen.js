import React, { useState } from 'react';
import { Alert } from 'react-native';
import AuthContent from '../components/Auth/AuthContent';
import LoadingOverlay from '../components/ui/LoadingOverlay';
import { register } from '../util/auth'; // Mengubah import dan memperbaiki path

function SignupScreen({navigation}) {
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  async function signupHandler( {akun}) {
    setIsAuthenticating(true);  
    try {
      await register(akun);
      setIsAuthenticating(false);
      navigation.replace('Login')
    } catch (error) {
      Alert.alert('Error','Sign up error');
      console.error(error)
      setIsAuthenticating(false); // Pastikan untuk menghentikan loading overlay pada kasus error
    }
  }

  if (isAuthenticating) {
    return <LoadingOverlay message="Creating user..."/>;
    // Pastikan prop-nya bernama message, bukan messages
  }

  return <AuthContent onAuthenticate={signupHandler}/>;
}

export default SignupScreen;