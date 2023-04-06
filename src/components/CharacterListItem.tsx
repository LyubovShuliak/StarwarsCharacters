import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { FC } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import Heart from '../assets/icons/Heart.svg';
import WhiteHeart from '../assets/icons/WhiteHeart.svg';
import {
  addToFavorites,
  favoritesArray,
  removeFromFavorites,
} from '../redux/characters/characters.slice';
import { useAppDispatch, useAppSelector } from '../redux/store';
import { Character } from '../redux/types';
import { COLORS, TYPOGRAPHY } from '../theme';
import { RootStackParamList } from '../types';
const CharacterItem: FC<{
  character: Character;
}> = ({ character }) => {
  const favoritesLinks = useAppSelector(favoritesArray);
  const dispatch = useAppDispatch();
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const { name, birth_year, gender } = character;
  const handlePressItem = () => {
    navigation.navigate('Character', { data: character });
  };

  const handleAddFavorite = () => {
    if (favoritesLinks.includes(character.url)) {
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
    <TouchableOpacity style={[styles.itemContainer]} onPress={handlePressItem}>
      <View style={styles.cardContainer}>
        <View style={[styles.textContainer]}>
          <View>
            <Text style={[styles.characterName, styles.text]}>
              Name: {name}
            </Text>
            <Text style={[styles.text, styles.subtitle]}>
              Year of birth: {birth_year}
            </Text>
          </View>
          <Text style={[styles.text, styles.subtitle]}>Gender: {gender}</Text>
        </View>
      </View>
      <TouchableOpacity onPress={handleAddFavorite} style={styles.button}>
        {favoritesLinks.includes(character.url) ? (
          <Heart width={20} height={20} />
        ) : (
          <WhiteHeart width={20} height={20} />
        )}
      </TouchableOpacity>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  itemContainer: {
    backgroundColor: COLORS.YELLOW,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 6,
    padding: 10,
    flexGrow: 1,
  },

  cardContainer: {
    display: 'flex',
    flexDirection: 'row',
  },
  characterName: {
    textTransform: 'capitalize',
    fontFamily: TYPOGRAPHY.FONTS.bold,
  },
  textContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  text: { color: COLORS.WHITE },
  subtitle: { fontFamily: TYPOGRAPHY.FONTS.regular },
  button: {
    padding: 20,
  },
});
export default CharacterItem;
