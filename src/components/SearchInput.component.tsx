import React, { Dispatch, FC } from 'react';
import {
  Dimensions,
  SafeAreaView,
  StyleSheet,
  TextInput,
  View,
} from 'react-native';

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
    width: Dimensions.get('screen').width * 0.95,
  },
  input: {
    height: 45,
    backgroundColor: COLORS.LIGHT_GREY,
    paddingLeft: 40,
    borderRadius: TYPOGRAPHY.BORDER_RADIUS.small,
    fontFamily: TYPOGRAPHY.FONTS.regular,
    color: COLORS.BLACK,
  },
  header: {
    flexDirection: 'row',
    marginTop: 12,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
export default SearchInput;
