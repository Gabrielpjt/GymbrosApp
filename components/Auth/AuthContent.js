import { useState } from 'react';
import { Alert, StyleSheet, View, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import FlatButton from '../ui/FlatButton';
import AuthForm from './AuthForm';
import { Colors } from '../../constants/styles';

function AuthContent({ isLogin, onAuthenticate }) {
  const navigation = useNavigation();

  const [credentialsInvalid, setCredentialsInvalid] = useState({
    username: false,
    password: false,
    confirmUsername: false,
    confirmPassword: false,
  });

  function switchAuthModeHandler() {
    if (isLogin) {
      navigation.replace('Signup');
    } else {
      navigation.replace('Login');
    }
  }

  function submitHandler(credentials) {
    let { username, confirmUsername, password, confirmPassword } = credentials;

    username = username.trim();
    password = password.trim();

    const usernameIsValid = username.length > 2;
    const passwordIsValid = password.length > 5;
    const usernamesAreEqual = username === confirmUsername;
    const passwordsAreEqual = password === confirmPassword;

    if (
      !usernameIsValid ||
      !passwordIsValid ||
      (!isLogin && (!usernamesAreEqual || !passwordsAreEqual))
    ) {
      Alert.alert('Invalid input', 'Please check your entered credentials.');
      setCredentialsInvalid({
        username: !usernameIsValid,
        confirmUsername: !usernameIsValid || !usernamesAreEqual,
        password: !passwordIsValid,
        confirmPassword: !passwordsAreEqual,
      });
      return;
    }
    onAuthenticate({ username, password });
  }

  return (
    <KeyboardAvoidingView
      style={styles.keyboardAvoidingView}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.authContent}>
          <AuthForm
            isLogin={isLogin}
            onSubmit={submitHandler}
            credentialsInvalid={credentialsInvalid}
          />
          <View style={styles.buttons}>
            <FlatButton onPress={switchAuthModeHandler}>
              {isLogin ? 'Create a new user' : 'Log in instead'}
            </FlatButton>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

export default AuthContent;

const styles = StyleSheet.create({
  keyboardAvoidingView: {
    flex: 1,
  },
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  authContent: {
    marginTop: 64,
    marginHorizontal: 32,
    padding: 16,
    borderRadius: 8,
    backgroundColor: Colors.primary800,
    elevation: 2,
    shadowColor: 'black',
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.35,
    shadowRadius: 4,
  },
  buttons: {
    marginTop: 8,
  },
});
