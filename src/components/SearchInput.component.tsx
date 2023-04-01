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
        {/*<View>*/}
        <SearchIcon />
        {/*</View>*/}

        <TextInput
          style={styles.input}
          onChangeText={onChangeText}
          value={text}
          placeholder={'Search'}
          placeholderTextColor={COLORS.GREY}
        />
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  inputContainer: {
    marginHorizontal: 10,
    width: '100%',
    backgroundColor: COLORS.LIGHT_GREY,
    borderRadius: TYPOGRAPHY.BORDER_RADIUS.small,
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    height: 45,
    flexShrink: 1,
    fontFamily: TYPOGRAPHY.FONTS.regular,
    color: COLORS.BLACK,
    paddingHorizontal: 5,
  },
  header: {
    flexDirection: 'row',
    marginTop: 12,
    marginHorizontal: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
export default SearchInput;
