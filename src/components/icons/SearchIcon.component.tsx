import React from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';

import Search from '../../assets/icons/Search.svg';
const SearchIcon = () => {
  const isPortrait = () => {
    const dim = Dimensions.get('screen');
    return dim.height >= dim.width;
  };
  return (
    <View
      style={[
        styles.icon,
        {
          top: isPortrait() ? '40%' : '56%',
          left: isPortrait() ? '5%' : '4.3%',
        },
      ]}
    >
      <Search />
    </View>
  );
};

const styles = StyleSheet.create({
  icon: {
    position: 'absolute',
  },
});

export default SearchIcon;
