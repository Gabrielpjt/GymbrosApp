import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import Navbar from '../components/ui/Navbar';
import { useIsFocused } from '@react-navigation/native';
import { UserContext } from '../contexts/UsersContext';

function ProfileScreen({ navigation }) {
  const isFocused = useIsFocused();
  const { user } = useContext(UserContext);
  const [reports, setReports] = useState([]);

  useEffect(() => {
    async function loadReports() {
      try {
        const response = await fetch(`https://gymbrosbeapp-production-b2f2.up.railway.app/api/report/reports/${user.username}`, {
          method: 'GET'
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const responseData = await response.json();
        console.log(responseData); // Melihat seluruh respons untuk mengecek strukturnya

        // Akses data dari respons yang diterima
        const data = responseData.data || []; // Default menjadi array kosong jika tidak ada data

        console.log(data);
        setReports(data);
        console.log("Data fetched successfully");
      } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
      }
    }

    loadReports();
  }, [isFocused, user.username]);

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Riwayat Olahraga</Text>
        <FlatList
          data={reports}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={styles.itemContainer}>
              <View style={styles.item}>
                <Text>Jenis Olahraga: <Text style={styles.text}>{item.jenis_olahraga}</Text></Text>
                <Text>Repetisi Latihan 1: <Text style={styles.text}>{item.repetisi_latihan_1}</Text></Text>
                <Text>Repetisi Latihan 2: <Text style={styles.text}>{item.repetisi_latihan_2}</Text></Text>
                <Text>Repetisi Latihan 3: <Text style={styles.text}>{item.repetisi_latihan_3}</Text></Text>
                <Text>Jumlah Kalori: <Text style={styles.text}>{item.jumlah_kalori}</Text></Text>
                <Text>Heart Rate Tertinggi: <Text style={styles.text}>{item.HeartRate_tertinggi}</Text></Text>
                <Text>Waktu Olahraga: <Text style={styles.text}>{new Date(item.waktu_olahraga).toLocaleString()}</Text></Text>
              </View>
            </View>
          )}
        />
      </View>
      <Navbar navigation={navigation} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
  },
  itemContainer: {
    marginBottom: 20,
  },
  item: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5,
  },
  text: {
    fontWeight: 'bold',
  },
});

export default ProfileScreen;
