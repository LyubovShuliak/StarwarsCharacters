import React, { FC } from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

import Arrow from '../assets/icons/BackArrow.svg';
import { COLORS, TYPOGRAPHY } from '../theme';
import Loader from './ActivityIndicator.component';
export const ListFooterComponent: FC<{
  toTheTopButtonVisible: boolean;
  scrollToTop: () => void;
  load: boolean;
  nextPage: string;
  searchText: string;
}> = ({ toTheTopButtonVisible, scrollToTop, load, searchText, nextPage }) => {
  return (
    <>
      {toTheTopButtonVisible && !searchText ? (
        <TouchableOpacity style={styles.toTheTopArrow} onPress={scrollToTop}>
          <Arrow
            height={20}
            width={20}
            style={{
              transform: [{ rotate: '90deg' }, { translateX: 2 }],
            }}
          />
        </TouchableOpacity>
      ) : null}
      {load ? <Loader /> : null}

      {!nextPage && !searchText && !load ? (
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
});
