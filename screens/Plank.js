import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import Navbar from '../components/ui/Navbar';
import { OneReportsContext } from '../contexts/OneReportContext';

function PlankScreen({ navigation }) {
  const [repetisi, setRepetisi] = useState(0);
  const [stopRepetisi, setStopRepetisi] = useState(false); // State untuk menandai apakah repetisi harus berhenti atau tidak
  const { onereports, setOneReports } = useContext(OneReportsContext);

  useEffect(() => {
    setOneReports((prevReports) => ({ ...prevReports, latihan3: repetisi }));
  }, [repetisi]);

  useEffect(() => {
    let interval;
    if (repetisi < 30 && !stopRepetisi) { // Hanya bertambah jika stopRepetisi false
      interval = setInterval(() => {
        setRepetisi((prevRepetisi) => prevRepetisi + 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [repetisi, stopRepetisi]);

  const handlePrev = () => {
    navigation.goBack();
  };

  const handleNext = () => {
    setStopRepetisi(true); // Set stopRepetisi true saat tombol "Selesai" ditekan
    navigation.navigate('ReportScreen');
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Image source={require('../assets/Plank.webp')} style={styles.gif} resizeMode="contain" />
        <Text style={styles.description}>Lakukan Plank selama: 30 detik</Text>
        <Text style={styles.repetisi}>Repetisi yang dilakukan: {repetisi}</Text>
      </View>
      <View style={styles.navButtonContainer}>
        <TouchableOpacity style={styles.navButton} onPress={handlePrev}>
          <Text style={styles.navButtonText}>Sebelumnya</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.navButton, styles.selesaiButton]} onPress={handleNext}>
          <Text style={styles.navButtonText}>Selesai</Text>
        </TouchableOpacity>
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
  gif: {
    width: '90%', // Lebih lebar
    height: 300, // Sedikit panjang
    marginBottom: 20,
  },
  description: {
    fontSize: 18,
    marginBottom: 10,
  },
  repetisi: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  navButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
  },
  navButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    backgroundColor: '#007bff',
    minWidth: 120, // Atur lebar minimum agar tombol "Selesai" memiliki ukuran yang sama dengan tombol "Sebelumnya"
  },
  navButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  selesaiButton: {
    // Tambahkan gaya tambahan jika diperlukan untuk tombol "Selesai"
  },
});

export default PlankScreen;
