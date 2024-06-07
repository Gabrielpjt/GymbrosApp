import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Navbar from '../components/ui/Navbar';
import { UserContext } from '../contexts/UsersContext';
import { useIsFocused } from '@react-navigation/native';

function ProfileScreen({ navigation }) {
  const { user } = useContext(UserContext);
  const isFocused = useIsFocused();
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    async function loadProfile() {
      try {
        const response = await fetch('https://gymbrosbeapp-production-b2f2.up.railway.app/api/users/' + user.username, {
          method: 'GET'
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const identity = await response.json();
        setProfile(identity);
        console.log("Data fetched successfully");
      } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
      }
    }

    if (isFocused) {
      loadProfile();
    }
  }, [isFocused, user.username]);

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Profile</Text>
        {profile ? (
          <View>
            <Text style={styles.infoText}>Username: {profile.username}</Text>
            <Text style={styles.infoText}>Gender: {profile.gender}</Text>
            <Text style={styles.infoText}>Age: {profile.age}</Text>
            <Text style={styles.infoText}>Address: {profile.address}</Text>
            <Text style={styles.infoText}>Blood Type: {profile.bloodType}</Text>
            <Text style={styles.infoText}>Occupation: {profile.occupation}</Text>
          </View>
        ) : (
          <Text>Loading...</Text>
        )}
      </View>
      <Navbar navigation={navigation} />
    </View>
  );
}

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
    color: "#fff"
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#fff',
  },
  infoText: {
    fontSize: 18,
    marginBottom: 8,
    color: '#fff',
  },
});
