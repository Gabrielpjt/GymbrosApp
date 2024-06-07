import React, { useContext } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native';
import Navbar from '../components/ui/Navbar';
import { OneReportsContext } from '../contexts/OneReportContext';
import { UserContext } from '../contexts/UsersContext';

function ReportScreen({ navigation }) {
  const { onereports } = useContext(OneReportsContext);
  const { user } = useContext(UserContext);

  const data = [
    { id: 1, jenisLatihan: 'Push Up Biasa', totalRepetisi: onereports.latihan1 },
    { id: 2, jenisLatihan: 'Push Up Kaki Ditekuk', totalRepetisi: onereports.latihan2 },
    { id: 3, jenisLatihan: 'Plank', totalRepetisi: onereports.latihan3 },
  ];

  const kaloriPerRepetisi = {
    'Push Up Biasa': 2,
    'Push Up Kaki Ditekuk': 4,
    'Plank': 1,
  };

  const totalRepetisi = data.reduce((total, item) => total + item.totalRepetisi, 0);
  const totalKalori = data.reduce((total, item) => total + (kaloriPerRepetisi[item.jenisLatihan] * item.totalRepetisi), 0);

  // Fungsi untuk menangani penyimpanan laporan
  const handleSimpanLaporan = async () => {
    const body = {
      waktu_olahraga: new Date().toISOString(), // Menggunakan waktu saat ini
      username: user.username,
      jenis_olahraga: "Latihan Lengan", // Jenis olahraga dapat disesuaikan
      repetisi_latihan_1: onereports.latihan1,
      repetisi_latihan_2: onereports.latihan2,
      repetisi_latihan_3: onereports.latihan3,
      jumlah_kalori: totalKalori,
      HeartRate_tertinggi: 130 // Anda dapat mengganti ini dengan nilai yang relevan
    };

    try {
      const response = await fetch('https://gymbrosbeapp-production-b2f2.up.railway.app/api/report/report', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
      });

      if (!response.ok) {
        throw new Error(`Gagal menyimpan laporan: ${response.statusText}`);
      }

      const data = await response.json();
      console.log('Laporan berhasil disimpan:', data);
      alert('Laporan berhasil disimpan!');
    } catch (error) {
      console.error('Terjadi kesalahan saat menyimpan laporan:', error);
      alert('Gagal menyimpan laporan. Silakan coba lagi.');
    }
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
    color: "#fff"
  },
  total: {
    fontWeight: 'bold',
  },
  totalKalori: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 20,
    color: "#fff"
  },
  button: {
    backgroundColor: '#FFD700',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 5,
    marginTop: 20,
    alignSelf: 'center',
    marginBottom: 20,
  },
  buttonText: {
    color: '#000',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ReportScreen;
