import React, { FC } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';

import Heart from '../assets/icons/Heart.svg';
import WhiteHeart from '../assets/icons/WhiteHeart.svg';
import {
  addToFavorites,
  favoritesArray,
  favsUploaded,
  removeFromFavorites,
} from '../redux/characters/characters.slice';
import { useAppDispatch, useAppSelector } from '../redux/store';
import { Character } from '../redux/types';

const AddToFavorites: FC<{ character: Character }> = ({ character }) => {
  const dispatch = useAppDispatch();
  const favoritesUriList = useAppSelector(favoritesArray);

  const favoritesUploaded = useAppSelector(favsUploaded);

  const handleFavorite = () => {
    if (favoritesUriList.includes(character.url)) {
      dispatch(
        removeFromFavorites({
          uri: character.url,
          gender: character.gender,
        })
      );
    } else {
      dispatch(
        addToFavorites({
          uri: character.url,
          gender: character.gender,
        })
      );
    }
  };
  return (
    <>
      {favoritesUploaded ? (
        <TouchableOpacity onPress={handleFavorite} style={styles.button}>
          {favoritesUriList.includes(character.url) ? (
            <Heart width={30} height={30} />
          ) : (
            <WhiteHeart width={30} height={30} />
          )}
        </TouchableOpacity>
      ) : null}
    </>
  );
};

const styles = StyleSheet.create({
  button: {
    padding: 10,
    height: 50,
    width: 50,
    margin: 10,
    borderRadius: 35,
  },
});

export default AddToFavorites;
