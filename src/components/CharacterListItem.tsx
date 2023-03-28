import React, {Dispatch, FC} from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Text,
} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../types';
import {useNavigation} from '@react-navigation/native';
import {Character, GENDER} from '../redux/types';
import {COLORS, TYPOGRAPHY} from '../theme';

import {useAppDispatch, useAppSelector} from '../redux/store';
import {
  addToFavs,
  favs,
  removeFromFavs,
} from '../redux/characters/characters.slice';

import Heart from '../assets/icons/Heart.svg';
import WhiteHeart from '../assets/icons/WhiteHeart.svg';
const CharacterItem: FC<{
  character: Character;
  clearSearch: Dispatch<string>;
}> = ({character, clearSearch}) => {
  const fans = useAppSelector(favs);
  const dispatch = useAppDispatch();
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const {name, birth_year, gender} = character;
  const handlePressItem = () => {
    clearSearch('');
    navigation.navigate('Character', {data: character});
  };

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
      <TouchableOpacity onPress={handleFavorite} style={styles.button}>
        {fans.includes(character.url) ? (
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
  text: {color: COLORS.WHITE, flexShrink: 1},
  subtitle: {fontFamily: TYPOGRAPHY.FONTS.regular},
  button: {
    padding: 20,
  },
});
export default CharacterItem;
