import { StyleSheet, Text, View } from 'react-native';
import Navbar from '../components/ui/Navbar';

function ProfileScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Riwayat</Text>
        <Text>This is your profile page.</Text>
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
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333', // Warna teks yang sama dengan HomeScreen
  },
});
