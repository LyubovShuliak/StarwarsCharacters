import React, { useEffect } from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import {
  clearState,
  fansByCategory,
  favoritesArray,
} from '../redux/characters/characters.slice';
import { saveFavoritesToAsyncStorage } from '../redux/characters/characters.thunk';
import { useAppDispatch, useAppSelector } from '../redux/store';
import { COLORS, TYPOGRAPHY } from '../theme';

const Favorites = () => {
  const dispatch = useAppDispatch();
  const fans = useAppSelector(fansByCategory);
  const fansArray = useAppSelector(favoritesArray);
  const reset = () => {
    dispatch(clearState());
  };

  useEffect(() => {
    dispatch(
      saveFavoritesToAsyncStorage({ fans, favoritesUriList: fansArray })
    );
  }, [fans, fansArray]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}> Favorites</Text>
        <TouchableOpacity style={styles.resetButton} onPress={reset}>
          <Text style={styles.resetButtonText}>RESET</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={Object.entries(fans)}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.item}>
              {item[1].title} {item[1].number}
            </Text>
          </View>
        )}
        keyExtractor={item => item[0]}
        horizontal={true}
        contentContainerStyle={styles.flatlistContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    display: 'flex',
    backgroundColor: COLORS.LIGHT_GREY,
    padding: 5,
    alignItems: 'center',
    justifyContent: 'center',
    alignContent: 'center',
    color: COLORS.BLACK,
  },
  container: {
    flexDirection: 'column',
    flexGrow: 1,
  },
  flatlistContainer: {
    justifyContent: 'space-between',
    width: '100%',
    alignSelf: 'center',
    paddingHorizontal: 10,
  },
  header: { flexDirection: 'row', justifyContent: 'space-between' },
  headerText: {
    color: COLORS.BLACK,
    fontFamily: TYPOGRAPHY.FONTS.bold,
    fontSize: 18,
    padding: 5,
  },
  resetButton: {
    borderStyle: 'solid',
    borderRadius: 10,
    borderColor: COLORS.RED,
    borderWidth: 1,
    padding: 5,
    margin: 10,
    maxWidth: 100,
    alignSelf: 'flex-end',
  },
  resetButtonText: {
    color: COLORS.RED,
    fontFamily: TYPOGRAPHY.FONTS.bold,
    textAlign: 'center',
  },
});

export default Favorites;
