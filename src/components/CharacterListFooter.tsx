import React, { FC } from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

import Arrow from '../assets/icons/BackArrow.svg';
import { loading, nextLink } from '../redux/characters/characters.slice';
import { useAppSelector } from '../redux/store';
import { COLORS, TYPOGRAPHY } from '../theme';
import Loader from './ActivityIndicator.component';
export const ListFooterComponent: FC<{
  toTheTopButtonVisible: boolean;
  scrollToTop: () => void;
  searchText: string;
}> = ({ toTheTopButtonVisible, scrollToTop, searchText }) => {
  const nextPage = useAppSelector(nextLink);
  const isLoading = useAppSelector(loading);

  return (
    <>
      {isLoading && !searchText ? <Loader /> : null}
      {toTheTopButtonVisible && !searchText ? (
        <TouchableOpacity style={styles.toTheTopArrow} onPress={scrollToTop}>
          <Arrow height={20} width={20} style={styles.arrow} />
        </TouchableOpacity>
      ) : null}
      {!nextPage && !searchText && !isLoading ? (
        <Text style={styles.lastPageNotify}>No more characters</Text>
      ) : null}
    </>
  );
};

const styles = StyleSheet.create({
  toTheTopArrow: {
    height: 40,
    zIndex: 100,
    alignSelf: 'center',
    padding: 10,
    borderRadius: 30,
  },
  lastPageNotify: {
    color: COLORS.BLACK,
    fontFamily: TYPOGRAPHY.FONTS.semibold,
    textAlign: 'center',
    width: '100%',
  },
  arrow: {
    transform: [{ rotate: '90deg' }, { translateX: 2 }],
  },
});
