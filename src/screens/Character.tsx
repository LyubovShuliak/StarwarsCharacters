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
    <ScrollView
      style={{
        height: '100%',
        backgroundColor: COLORS.LIGHT_GREY,
      }}
    >
      <View style={styles.header}>
        <BackIcon />
        <AddToFavorites character={route.params.data} />
      </View>

      <View style={[styles.descriptionContainer]}>
        <Text style={[styles.characterData, styles.name]}>Name: {name}</Text>
        <Text style={[styles.characterData, styles.info]}>
          Gender: {gender}
        </Text>
        <Text style={[styles.characterData, styles.info]}>
          Year of birth: {birth_year}
        </Text>

        <Text style={[styles.characterData, styles.info]}>
          Height: {height}
        </Text>
        <Text style={[styles.characterData, styles.info]}>
          Eye color: {eye_color}
        </Text>
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
  characterData: {
    fontSize: 20,
    paddingBottom: 5,
    borderBottomWidth: 1,
    borderColor: COLORS.BLOCK_GREY,
    textTransform: 'capitalize',
    marginVertical: 10,
    color: COLORS.BLOCK_GREY,
  },
  characterCategory: {
    fontSize: 20,
    paddingBottom: 5,
    textTransform: 'capitalize',
    borderColor: COLORS.BLOCK_GREY,
  },
  descriptionContainer: {
    paddingHorizontal: 20,
  },

  container: { flex: 1, paddingBottom: 60 },
});
export default Character;
