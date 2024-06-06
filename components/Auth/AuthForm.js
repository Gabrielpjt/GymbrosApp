import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, View, ScrollView, KeyboardAvoidingView, Platform, TextInput } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';

import Button from '../ui/Button';
import Input from './Input';
import { Colors } from '../../constants/styles';

function AuthForm({ isLogin, onSubmit, credentialsInvalid }) {
  const [enteredUsername, setEnteredUsername] = useState('');
  const [enteredConfirmUsername, setEnteredConfirmUsername] = useState('');
  const [enteredPassword, setEnteredPassword] = useState('');
  const [enteredConfirmPassword, setEnteredConfirmPassword] = useState('');
  const [enteredOccupation, setEnteredOccupation] = useState('');
  const [enteredAlamat, setEnteredAlamat] = useState('');
  const [enteredGender, setEnteredGender] = useState('');
  const [enteredGolDarah, setEnteredGolDarah] = useState('');
  const [enteredAge, setEnteredAge] = useState('');

  const {
    username: usernameIsInvalid,
    confirmUsername: usernamesDontMatch,
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
      case 'occupation':
        setEnteredOccupation(enteredValue);
        break;
      case 'alamat':
        setEnteredAlamat(enteredValue);
        break;
      case 'gender':
        setEnteredGender(enteredValue);
        break;
      case 'golDarah':
        setEnteredGolDarah(enteredValue);
        break;
      case 'age':
        setEnteredAge(enteredValue);
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
      occupation: enteredOccupation,
      alamat: enteredAlamat,
      gender: enteredGender,
      golDarah: enteredGolDarah,
      age: enteredAge,
    });
  }

  return (
    <KeyboardAvoidingView
      style={styles.keyboardAvoidingView}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView
        contentContainerStyle={styles.scrollViewContent}
        keyboardShouldPersistTaps="handled" // Memastikan input tetap dapat diakses saat keyboard muncul
      >
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
            <Input
              label="Occupation"
              onUpdateValue={updateInputValueHandler.bind(this, 'occupation')}
              value={enteredOccupation}
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
            <Dropdown
              style={styles.dropdown}
              data={[
                { label: 'A', value: 'A' },
                { label: 'B', value: 'B' },
                { label: 'AB', value: 'AB' },
                { label: 'O', value: 'O' },
              ]}
              labelField="label"
              valueField="value"
              value={enteredGolDarah}
              onChange={(item) => updateInputValueHandler('golDarah', item.value)}
              placeholder="Select Golongan Darah"
            />
          )}
          {!isLogin && (
            <Input
              label="Age"
              onUpdateValue={updateInputValueHandler.bind(this, 'age')}
              keyboardType="numeric"
              value={enteredAge}
            />
          )}
          <View style={styles.buttons}>
            <Button onPress={submitHandler}>
              {isLogin ? 'Log In' : 'Sign Up'}
            </Button>
          </View>
          {/* Spacer to push the button into view when the keyboard is up */}
          <View style={styles.spacer} />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  keyboardAvoidingView: {
    flex: 1,
  },
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  form: {
    marginTop: 20, // Menambah margin atas untuk memberikan ruang antara form dan header
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
    marginTop: 40,
    marginBottom: 8,
    borderRadius: 4,
    backgroundColor: 'white',
    padding: 8,
  },
  buttons: {
    marginTop: 12,
    marginBottom: Platform.OS === 'ios' ? 12 : 0, // Menambah margin bawah hanya untuk iOS
  },
  spacer: {
    height: 200, // Menyesuaikan tinggi sesuai kebutuhan untuk memastikan tombol tetap terlihat saat keyboard muncul
  },
});


export default AuthForm;

