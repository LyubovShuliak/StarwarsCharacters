import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { FC } from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import Heart from '../assets/icons/Heart.svg';
import WhiteHeart from '../assets/icons/WhiteHeart.svg';
import {
  addToFavorites,
  favoritesArray,
  removeFromFavorites,
} from '../redux/characters/characters.slice';
import { useAppDispatch, useAppSelector } from '../redux/store';
import { Character, GENDER } from '../redux/types';
import { COLORS, TYPOGRAPHY } from '../theme';
import { RootStackParamList } from '../types';
const CharacterItem: FC<{
  character: Character;
  clearSearch: () => void;
}> = ({ character, clearSearch }) => {
  const favoritesLinks = useAppSelector(favoritesArray);
  const dispatch = useAppDispatch();
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const { name, birth_year, gender } = character;
  const handlePressItem = () => {
    clearSearch();
    navigation.navigate('Character', { data: character });
  };

  const handleAddFavorite = () => {
    if (favoritesLinks.includes(character.url)) {
      dispatch(
        removeFromFavorites({
          uri: character.url,
          gender: character.gender as GENDER,
        })
      );
    } else {
      dispatch(
        addToFavorites({
          uri: character.url,
          gender: character.gender as GENDER,
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
    width: Dimensions.get('screen').width * 0.95,
    marginHorizontal: Dimensions.get('screen').width * 0.025,
    marginVertical: 6,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
  },

  cardContainer: {
    display: 'flex',
    flexDirection: 'row',
    padding: 20,
  },
  characterName: {
    textTransform: 'capitalize',
    fontFamily: TYPOGRAPHY.FONTS.bold,
  },
  textContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    flexShrink: 1,
  },
  text: { color: COLORS.WHITE, flexShrink: 1 },
  subtitle: { fontFamily: TYPOGRAPHY.FONTS.regular },
  button: {
    padding: 20,
  },
});
export default CharacterItem;
