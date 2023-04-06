import { StackScreenProps } from '@react-navigation/stack';
import React, { FC } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

import AddToFavorites from '../components/AddToFavoritesButton';
import BackIcon from '../components/icons/BackIcon.component';
import { COLORS, TYPOGRAPHY } from '../theme';
import { RootStackParamList } from '../types';
type CharacterScreenProps = StackScreenProps<RootStackParamList, 'Character'>;
const Character: FC<CharacterScreenProps> = ({ route }) => {
  const {
    data: { name, gender, height, birth_year, eye_color },
  } = route.params;

  return (
    <ScrollView style={styles.scrollableContainer}>
      <View style={styles.header}>
        <BackIcon />
        <AddToFavorites character={route.params.data} />
      </View>

      <View style={[styles.descriptionContainer]}>
        <View style={styles.textContainer}>
          <Text style={[styles.characterCategory]}>Name:</Text>
          <Text style={[styles.characterData, styles.name]}>{name} </Text>
        </View>
        <View style={styles.textContainer}>
          <Text style={[styles.characterCategory]}>Gender:</Text>
          <Text style={[styles.characterData, styles.info]}>{gender}</Text>
        </View>
        <View style={styles.textContainer}>
          <Text style={[styles.characterCategory]}>Year of birth:</Text>
          <Text style={[styles.characterData, styles.info]}>{birth_year}</Text>
        </View>
        <View style={styles.textContainer}>
          <Text style={[styles.characterCategory]}>Height:</Text>
          <Text style={[styles.characterData, styles.info]}>{height}</Text>
        </View>
        <View style={styles.textContainer}>
          <Text style={[styles.characterCategory]}>Eye color:</Text>
          <Text style={[styles.characterData, styles.info]}>{eye_color}</Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  name: {
    fontFamily: TYPOGRAPHY.FONTS.bold,
  },
  header: { flexDirection: 'row' },
  info: { fontFamily: TYPOGRAPHY.FONTS.regular },
  textContainer: {
    borderBottomWidth: 1,
    borderColor: COLORS.BLOCK_GREY,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    maxWidth: '100%',
  },

  characterData: {
    fontSize: 16,
    textTransform: 'capitalize',
    color: COLORS.BLOCK_GREY,
    flex: 1,
  },
  characterCategory: {
    fontSize: 15,
    color: COLORS.BLACK,
    textTransform: 'uppercase',
    borderColor: COLORS.BLOCK_GREY,
    fontFamily: TYPOGRAPHY.FONTS.light,
    width: 145,
  },
  descriptionContainer: {
    paddingHorizontal: 20,
  },

  container: { flex: 1, paddingBottom: 60 },
  scrollableContainer: {
    height: '100%',
    backgroundColor: COLORS.LIGHT_GREY,
    paddingTop: 20,
  },
});
export default Character;
