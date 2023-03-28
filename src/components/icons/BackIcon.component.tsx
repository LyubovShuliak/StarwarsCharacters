import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import React from 'react';
import {StyleSheet, Text, TouchableOpacity, useColorScheme} from 'react-native';
import Back from '../../assets/icons/BackArrow.svg';

import {RootStackParamList} from '../../types';
import {COLORS} from '../../theme';

const BackIcon = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const theme = useColorScheme() === 'dark';
  return (
    <TouchableOpacity
      style={[styles.backButton]}
      onPress={() => navigation.goBack()}>
      <Back height={15} width={15} />
      <Text style={styles.text}>Go back</Text>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  backButton: {
    display: 'flex',
    flex: 1,
    alignItems: 'center',
    // // flexGrow: 1,
    // justifyContent: 'center',
    // paddingRight: 15,
    flexDirection: 'row',
    // maxWidth: 20,

    padding: 20,
  },
  text: {
    color: COLORS.BLACK,
    fontSize: 16,
    height: 20,
  },
});
export default BackIcon;
