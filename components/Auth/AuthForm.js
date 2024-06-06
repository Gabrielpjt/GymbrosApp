import { useState } from 'react';
import { StyleSheet, View, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';

import Button from '../ui/Button';
import Input from './Input';
import { Colors } from '../../constants/styles';

function AuthForm({ isLogin, onSubmit, credentialsInvalid }) {
  const [enteredUsername, setEnteredUsername] = useState('');
  const [enteredConfirmUsername, setEnteredConfirmUsername] = useState('');
  const [enteredPassword, setEnteredPassword] = useState('');
  const [enteredConfirmPassword, setEnteredConfirmPassword] = useState('');
  const [enteredGender, setEnteredGender] = useState('');
  const [enteredAlamat, setEnteredAlamat] = useState('');
  const [enteredGolDarah, setEnteredGolDarah] = useState('');
  const [enteredOccupation, setEnteredOccupation] = useState('');

  const {
    username: usernameIsInvalid,
    confirmusername: usernamesDontMatch,
    password: passwordIsInvalid,
    confirmPassword: passwordsDontMatch,
  } = credentialsInvalid;

  function updateInputValueHandler(inputType, enteredValue) {
    switch (inputType) {
      case 'username':
        setEnteredUsername(enteredValue);
        break;
      case 'confirmUsername':
        setEnteredConfirmUsername(enteredValue);
        break;
      case 'password':
        setEnteredPassword(enteredValue);
        break;
      case 'confirmPassword':
        setEnteredConfirmPassword(enteredValue);
        break;
      case 'gender':
        setEnteredGender(enteredValue);
        break;
      case 'alamat':
        setEnteredAlamat(enteredValue);
        break;
      case 'golDarah':
        setEnteredGolDarah(enteredValue);
        break;
      case 'occupation':
        setEnteredOccupation(enteredValue);
        break;
      default:
        break;
    }
  }

  function submitHandler() {
    onSubmit({
      username: enteredUsername,
      confirmUsername: enteredConfirmUsername,
      password: enteredPassword,
      confirmPassword: enteredConfirmPassword,
      gender: enteredGender,
      alamat: enteredAlamat,
      golDarah: enteredGolDarah,
      occupation: enteredOccupation,
    });
  }

  return (
    <KeyboardAvoidingView
      style={styles.keyboardAvoidingView}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.form}>
          <Input
            label="Username"
            onUpdateValue={updateInputValueHandler.bind(this, 'username')}
            value={enteredUsername}
            keyboardType="username"
            isInvalid={usernameIsInvalid}
          />
          {!isLogin && (
            <Input
              label="Confirm Username"
              onUpdateValue={updateInputValueHandler.bind(this, 'confirmUsername')}
              value={enteredConfirmUsername}
              keyboardType="Username"
              isInvalid={usernamesDontMatch}
            />
          )}
          <Input
            label="Password"
            onUpdateValue={updateInputValueHandler.bind(this, 'password')}
            secure
            value={enteredPassword}
            isInvalid={passwordIsInvalid}
          />
          {!isLogin && (
            <Input
              label="Confirm Password"
              onUpdateValue={updateInputValueHandler.bind(this, 'confirmPassword')}
              secure
              value={enteredConfirmPassword}
              isInvalid={passwordsDontMatch}
            />
          )}
          {!isLogin && (
            <Dropdown
              style={styles.dropdown}
              data={[
                { label: 'Laki-laki', value: 'Laki-laki' },
                { label: 'Perempuan', value: 'Perempuan' },
              ]}
              labelField="label"
              valueField="value"
              value={enteredGender}
              onChange={(item) => updateInputValueHandler('gender', item.value)}
              placeholder="Select Gender"
            />
          )}
          {!isLogin && (
            <Input
              label="Alamat"
              onUpdateValue={updateInputValueHandler.bind(this, 'alamat')}
              value={enteredAlamat}
            />
          )}
          {!isLogin && (
            <Input
              label="Golongan Darah"
              onUpdateValue={updateInputValueHandler.bind(this, 'golDarah')}
              value={enteredGolDarah}
            />
          )}
          {!isLogin && (
            <Input
              label="Occupation"
              onUpdateValue={updateInputValueHandler.bind(this, 'occupation')}
              value={enteredOccupation}
            />
          )}
          <View style={styles.buttons}>
            <Button onPress={submitHandler}>
              {isLogin ? 'Log In' : 'Sign Up'}
            </Button>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

export default AuthForm;

const styles = StyleSheet.create({
  keyboardAvoidingView: {
    flex: 1,
  },
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  form: {
    marginTop: 40,
    marginHorizontal: 24,
    padding: 16,
    borderRadius: 8,
    backgroundColor: Colors.primary800,
    elevation: 4,
    shadowColor: 'black',
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 6,
  },
  dropdown: {
    marginTop: 16,
    marginBottom: 8,
    borderRadius: 4,
    backgroundColor: 'white',
    padding: 8,
  },
  buttons: {
    marginTop: 12,
  },
});
