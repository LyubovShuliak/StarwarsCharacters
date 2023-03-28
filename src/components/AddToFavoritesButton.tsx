import React, {FC} from 'react';

import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Heart from '../assets/icons/Heart.svg';
import WhiteHeart from '../assets/icons/WhiteHeart.svg';
import {COLORS, TYPOGRAPHY} from '../theme';
import {
  addToFavs,
  fansByCategory,
  favs,
  removeFromFavs,
} from '../redux/characters/characters.slice';
import {Character, GENDER} from '../redux/types';
import {useAppDispatch, useAppSelector} from '../redux/store';

const AddToFavorites: FC<{character: Character}> = ({character}) => {
  const dispatch = useAppDispatch();
  const fans = useAppSelector(favs);

  const handleFavorite = () => {
    if (fans.includes(character.url)) {
      dispatch(
        removeFromFavs({
          uri: character.url,
          gender: character.gender as GENDER,
        }),
      );
    } else {
      dispatch(
        addToFavs({uri: character.url, gender: character.gender as GENDER}),
      );
    }
  };
  return (
    <TouchableOpacity onPress={handleFavorite} style={styles.button}>
      {fans.includes(character.url) ? (
        <Heart width={30} height={30} />
      ) : (
        <WhiteHeart width={30} height={30} />
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    padding: 10,
    height: 50,
    margin: 10,
    borderRadius: 35,
  },
});

export default AddToFavorites;
