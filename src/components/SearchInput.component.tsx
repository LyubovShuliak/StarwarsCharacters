import { debounce } from 'lodash';
import React, { Dispatch, FC, useCallback } from 'react';
import { SafeAreaView, StyleSheet, TextInput, View } from 'react-native';

import { setLoading } from '../redux/characters/characters.slice';
import { searchPeople } from '../redux/characters/characters.thunk';
import { useAppDispatch } from '../redux/store';
import { COLORS, TYPOGRAPHY } from '../theme';
import SearchIcon from './icons/SearchIcon.component';

type Props = {
  text: string;
  onChangeText: Dispatch<React.SetStateAction<string>>;
};
const SearchInput: FC<Props> = ({ onChangeText, text }) => {
  const dispatch = useAppDispatch();

  const filterCharacters = useCallback(
    debounce((text: string) => {
      dispatch(searchPeople(text));
    }, 500),
    []
  );
  const handleChange = (text: string) => {
    onChangeText(text);
    if (text.length > 0) {
      dispatch(setLoading());
      filterCharacters(text);
    }
  };
  return (
    <SafeAreaView style={[styles.header]}>
      <View style={[styles.inputContainer]}>
        <SearchIcon />
        <TextInput
          style={styles.input}
          value={text}
          placeholder={'Search...'}
          placeholderTextColor={COLORS.GREY}
          onChangeText={handleChange}
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
    flex: 1,
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
