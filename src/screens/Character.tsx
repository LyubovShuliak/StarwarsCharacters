import React, {FC} from 'react';

import {
  Dimensions,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {RootStackParamList} from '../types';
import {StackNavigationProp, StackScreenProps} from '@react-navigation/stack';
import BackIcon from '../components/icons/BackIcon.component';
import {COLORS, TYPOGRAPHY} from '../theme';
import {useAppDispatch} from '../redux/store';
import AddToFavorites from '../components/AddToFavoritesButton';
type CharacterScreenProps = StackScreenProps<RootStackParamList, 'Character'>;
const Character: FC<CharacterScreenProps> = ({route}) => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  const onPress = () => {
    navigation.navigate('Home');
  };
  const dispatch = useAppDispatch();
  const {
    data: {name, id, gender, height, birth_year},
  } = route.params;

  return (
    <SafeAreaView
      style={{
        height: Dimensions.get('screen').height,
        backgroundColor: COLORS.LIGHT_GREY,
      }}>
      <View style={{flexDirection: 'row'}}>
        <BackIcon />
        <AddToFavorites character={route.params.data} />
      </View>

      <View style={[styles.descriptionContainer]}>
        <Text
          style={[styles.characterName, {fontFamily: TYPOGRAPHY.FONTS.bold}]}>
          Name: {name}
        </Text>
        <Text
          style={[
            styles.characterName,
            {fontFamily: TYPOGRAPHY.FONTS.regular},
          ]}>
          Gender: {gender}
        </Text>
        <Text
          style={[
            styles.characterName,
            {fontFamily: TYPOGRAPHY.FONTS.regular},
          ]}>
          Year of birth: {birth_year}
        </Text>
        <Text
          style={[
            styles.characterName,
            {fontFamily: TYPOGRAPHY.FONTS.regular},
          ]}>
          Height: {height}
        </Text>
      </View>

      <View style={{flex: 1}} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  characterName: {
    fontSize: 20,
    paddingBottom: 5,
    borderBottomWidth: 1,
    borderColor: COLORS.BLOCK_GREY,
    textTransform: 'capitalize',
    marginVertical: 10,
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

  container: {flex: 1, paddingBottom: 60},
});
export default Character;
