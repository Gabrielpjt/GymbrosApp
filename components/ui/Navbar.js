import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Colors } from '../../constants/styles';

const Navbar = ({ navigation }) => {
  const navigateTo = (screen) => {
    navigation.navigate(screen);
  };

  return (
    <View style={styles.navbar}>
      <NavItem icon="home" text="Home" onPress={() => navigateTo('Home')} />
      <NavItem icon="person" text="Profile" onPress={() => navigateTo('Profile')} />
      <NavItem icon="history" text="Riwayat" onPress={() => navigateTo('RiwayatScreen')} />
    </View>
  );
};

const NavItem = ({ icon, text, onPress }) => (
  <TouchableOpacity style={styles.navItem} onPress={onPress}>
    <Icon name={icon} size={24} style={styles.icon} />
    <Text style={styles.navText}>{text}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  navbar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: Colors.primary500,
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
  },
  navItem: {
    alignItems: 'center',
    marginHorizontal: 15,
  },
  icon: {
    marginBottom: 4,
  },
  navText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default Navbar;
