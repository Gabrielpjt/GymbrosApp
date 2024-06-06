import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import Navbar from '../components/ui/Navbar';
import { OneReportsContext } from '../contexts/OneReportContext';

function PushUp2Screen({ navigation }) {
  const [repetisi, setRepetisi] = useState(0);
  const { onereports, setOneReports } = useContext(OneReportsContext);

  useEffect(() => {
    setOneReports((prevReports) => ({ ...prevReports, latihan2: repetisi }));
  }, [repetisi]);

  const handlePrev = () => {
    navigation.goBack();
  };

  const handleNext = () => {
    console.log(onereports);
    navigation.navigate('Plank');
  };

  const increaseRepetisi = () => {
    setRepetisi((prevRepetisi) => prevRepetisi + 1);
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Image source={require('../assets/Kneeling-push-ups.webp')} style={styles.gif} resizeMode="contain" />
        <Text style={styles.description}>Lakukan push up sebanyak: 10</Text>
        <Text style={styles.repetisi}>Repetisi yang dilakukan : {repetisi}</Text>
        <TouchableOpacity style={styles.increaseButton} onPress={increaseRepetisi}>
          <Text style={styles.increaseButtonText}>Tambah Repetisi</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.navButtonContainer}>
        <TouchableOpacity style={styles.navButton} onPress={handlePrev}>
          <Text style={styles.navButtonText}>Sebelumnya</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navButton} onPress={handleNext}>
          <Text style={styles.navButtonText}>Selanjutnya</Text>
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
  increaseButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    backgroundColor: '#28a745',
    marginBottom: 20,
  },
  increaseButtonText: {
    color: '#fff',
    fontWeight: 'bold',
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
  },
  navButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default PushUp2Screen;
