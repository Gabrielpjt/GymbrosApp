import React, { useContext, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Navbar from '../components/ui/Navbar';
import KelasBox from '../components/ui/KelasBox';
import { OneReportsContext } from '../contexts/OneReportContext';

function HomeScreen({ navigation }) {
  const { setOneReports } = useContext(OneReportsContext);

  // useEffect(() => {
  //   // Inisialisasi data untuk onereport saat komponen di-render pertama kali
  //   const initData = [{
  //     jenisLatihan: 'latihan lengan',
  //     latihan1: 0,
  //     latihan2: 0,
  //     latihan3: 0,
  //   }];
  //   setOneReports(initData);
  // }, []); // Gunakan array kosong sebagai dependensi agar efek hanya dijalankan sekali saat mounting

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Welcome!</Text>
        <Text>Pilih Olahraga yang ingin anda lakukan!</Text>
      </View>
      <View style={styles.kelasBoxContainer}>
        <KelasBox 
          judul="Latihan Otot Lengan"
          deskripsi="Latihan : Push up, Angkat Barbel, Push up tangan melebar"
          gambar={require('../assets/pushup.jpeg')}
          navigation={navigation}
          screen="Push Up Biasa"
        />
        <KelasBox 
          judul="Latihan otot Perut"
          deskripsi="Latihan : Sit up, Plank, Puntir Perut"
          gambar={require('../assets/situp.jpeg')}
          navigation={navigation}
        />
        {/* Tambahkan KelasBox lainnya di sini */}
      </View>
      <Navbar navigation={navigation} />
    </View>
  );
}

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
  },
  kelasBoxContainer: {
    alignItems: 'center',
  },
});

export default HomeScreen;
