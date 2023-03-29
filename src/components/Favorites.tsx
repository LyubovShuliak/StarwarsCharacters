import React, {useEffect} from 'react';

import {
  Dimensions,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useAppDispatch, useAppSelector} from '../redux/store';
import {
  clearState,
  fansByCategory,
  favs,
} from '../redux/characters/characters.slice';
import {COLORS, TYPOGRAPHY} from '../theme';
import {saveFavoritesToAsyncStorage} from '../redux/characters/characters.thunk';

const Favorites = () => {
  const dispatch = useAppDispatch();
  const fans = useAppSelector(fansByCategory);
  const fansArray = useAppSelector(favs);
  const reset = () => {
    dispatch(clearState());
  };

  useEffect(() => {
    dispatch(saveFavoritesToAsyncStorage({fans, favsUriList: fansArray}));
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
        renderItem={({item}) => (
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
  },
  container: {
    flexDirection: 'column',
  },
  flatlistContainer: {
    justifyContent: 'space-between',
    width: Dimensions.get('screen').width,
    alignSelf: 'center',
    paddingHorizontal: 10,
  },
  header: {flexDirection: 'row', justifyContent: 'space-between'},
  headerText: {fontFamily: TYPOGRAPHY.FONTS.bold, fontSize: 18, padding: 5},
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
