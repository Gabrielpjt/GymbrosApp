import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native'; // tambahkan Image
import { Colors } from '../../constants/styles';

const KelasBox = ({ judul, deskripsi, gambar, navigation, screen }) => {
  return (
    <TouchableOpacity style={styles.kelasBox} onPress={() => navigation.navigate(screen)}>
      <Image source={gambar} style={styles.gambarKelas} />
      <View style={styles.textContainer}>
        <Text style={styles.judul}>{judul}</Text>
        <Text style={styles.deskripsi}>{deskripsi}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  kelasBox: {
    width: '90%',
    borderRadius: 10,
    backgroundColor: '#fff',
    padding: 10,
    marginBottom: 20,
    elevation: 3,
  },
  gambarKelas: {
    width: '100%',
    height: 150,
    borderRadius: 10,
    marginBottom: 10,
  },
  textContainer: {
    paddingHorizontal: 10,
  },
  judul: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  deskripsi: {
    fontSize: 16,
    color: '#666',
  },
});

export default KelasBox;
