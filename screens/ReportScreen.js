import React, { useContext } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native';
import Navbar from '../components/ui/Navbar';
import { OneReportsContext } from '../contexts/OneReportContext';
import { UsersContext } from '../contexts/UsersContext';

function ReportScreen({ navigation }) {
  const { onereports } = useContext(OneReportsContext);
  const { user } = useContext(UsersContext);
  const data = [
    { id: 1, jenisLatihan: 'Push Up Biasa', totalRepetisi: onereports.latihan1 },
    { id: 2, jenisLatihan: 'Push Up Kaki Ditekuk', totalRepetisi: onereports.latihan2 },
    { id: 3, jenisLatihan: 'Plank', totalRepetisi: onereports.latihan3 },
  ];

  // Objek untuk menyimpan nilai kalori untuk setiap jenis latihan
  const kaloriPerRepetisi = {
    'Push Up Biasa': 2,
    'Push Up Kaki Ditekuk': 4,
    'Plank': 1,
  };

  // Menghitung total repetisi dan total kalori
  const totalRepetisi = data.reduce((total, item) => total + item.totalRepetisi, 0);
  const totalKalori = data.reduce((total, item) => total + (kaloriPerRepetisi[item.jenisLatihan] * item.totalRepetisi), 0);

  const handleSimpanLaporan = () => {
    // Logika untuk menyimpan laporan disini
    // Misalnya, Anda bisa menggunakan AsyncStorage atau API untuk menyimpan laporan
    console.log(user)
    alert('Laporan disimpan!');
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <FlatList
          data={data}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.row}>
              <Text style={styles.cell}>{item.jenisLatihan}</Text>
              <Text style={styles.cell}>{item.totalRepetisi}</Text>
            </View>
          )}
          ListFooterComponent={() => (
            <View style={styles.row}>
              <Text style={[styles.cell, styles.total]}>Total</Text>
              <Text style={[styles.cell, styles.total]}>{totalRepetisi}</Text>
            </View>
          )}
        />
        <Text style={styles.totalKalori}>Total Kalori: {totalKalori}</Text>
        <TouchableOpacity style={styles.button} onPress={handleSimpanLaporan}>
          <Text style={styles.buttonText}>Simpan Laporan</Text>
        </TouchableOpacity>
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
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  cell: {
    flex: 1,
    textAlign: 'center',
    fontSize: 16,
  },
  total: {
    fontWeight: 'bold',
  },
  totalKalori: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 20,
  },
  button: {
    backgroundColor: '#007bff',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 5,
    marginTop: 20,
    alignSelf: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ReportScreen;
