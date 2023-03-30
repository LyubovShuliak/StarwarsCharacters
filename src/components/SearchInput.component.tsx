import React, { Dispatch, FC } from 'react';
import { SafeAreaView, StyleSheet, TextInput, View } from 'react-native';

import { COLORS, TYPOGRAPHY } from '../theme';
import SearchIcon from './icons/SearchIcon.component';

type Props = {
  text: string;
  onChangeText: Dispatch<React.SetStateAction<string>>;
};
const SearchInput: FC<Props> = ({ onChangeText, text }) => {
  return (
    <SafeAreaView style={[styles.header]}>
      <View style={[styles.inputContainer]}>
        <TextInput
          style={styles.input}
          onChangeText={onChangeText}
          value={text}
          placeholder={'Search'}
          placeholderTextColor={COLORS.GREY}
        />
        <SearchIcon />
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  inputContainer: {
    position: 'relative',
    width: '100%',
    padding: '2.5%',
  },
  input: {
    height: 45,
    backgroundColor: COLORS.LIGHT_GREY,
    paddingLeft: 40,
    borderRadius: TYPOGRAPHY.BORDER_RADIUS.small,
    fontFamily: TYPOGRAPHY.FONTS.regular,
    color: COLORS.BLACK,
    paddingTop: 5,
  },
  header: {
    flexDirection: 'row',
    marginTop: 12,
    padding: '1%',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
export default SearchInput;
