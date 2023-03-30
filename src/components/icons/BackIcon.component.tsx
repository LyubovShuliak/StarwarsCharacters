import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

import Back from '../../assets/icons/BackArrow.svg';
import { COLORS } from '../../theme';
import { RootStackParamList } from '../../types';

const BackIcon = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  return (
    <TouchableOpacity
      style={[styles.backButton]}
      onPress={() => navigation.goBack()}
    >
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
    flexDirection: 'row',

    padding: 20,
  },
  text: {
    color: COLORS.BLACK,
    fontSize: 16,
    height: 20,
  },
});
export default BackIcon;
