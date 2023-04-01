import React, { Dispatch, FC, SetStateAction } from 'react';
import { StyleSheet, View } from 'react-native';

import Favorites from './Favorites';
import SearchInput from './SearchInput.component';

type Props = {
  searchText: string;
  setSearchText: Dispatch<SetStateAction<string>>;
};
const Header: FC<Props> = ({ searchText, setSearchText }) => {
  return (
    <View style={styles.header}>
      <Favorites />
      <SearchInput text={searchText} onChangeText={setSearchText} />
    </View>
  );
};
const styles = StyleSheet.create({
  header: {
    width: '100%',
    alignContent: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
});
export default Header;
