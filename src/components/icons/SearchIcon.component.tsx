import React from 'react';
import { StyleSheet, View } from 'react-native';

import Search from '../../assets/icons/Search.svg';
const SearchIcon = () => {
  return (
    <View style={styles.icon}>
      <Search />
    </View>
  );
};

const styles = StyleSheet.create({
  icon: {
    position: 'absolute',
    top: 10,
    left: 10,
  },
});

export default SearchIcon;
