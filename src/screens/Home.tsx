import React, { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, Text } from 'react-native';

import CharactersList from '../components/CharacterList';
import Header from '../components/Header';
import {
  errorMessage,
  loading,
  people,
  searchedPeople,
} from '../redux/characters/characters.slice';
import { getPeople } from '../redux/characters/characters.thunk';
import { useAppDispatch, useAppSelector } from '../redux/store';
import { Character } from '../redux/types';
import { COLORS } from '../theme';

const Home = () => {
  const dispatch = useAppDispatch();

  const charactersList = useAppSelector(people);
  const charactersSearchedList = useAppSelector(searchedPeople);
  const isLoading = useAppSelector(loading);
  const error = useAppSelector(errorMessage);
  const [charactersToDisplay, setCharactersToDisplay] = useState<Character[]>(
    []
  );
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    if (!charactersList.length) {
      dispatch(getPeople());
    }
  }, [charactersList]);

  useEffect(() => {
    if (isLoading) {
      return;
    }
    if (searchText.length > 0) {
      setCharactersToDisplay(charactersSearchedList);
    } else {
      setCharactersToDisplay(charactersList);
    }
  }, [charactersSearchedList, charactersList, isLoading]);

  return (
    <SafeAreaView style={styles.list}>
      <Header searchText={searchText} setSearchText={setSearchText} />
      {error ? <Text style={styles.errorMessage}>{error} </Text> : null}

      <CharactersList data={charactersToDisplay} searchText={searchText} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  list: {
    flex: 1,
  },
  errorMessage: {
    fontSize: 15,
    color: COLORS.RED,
    textAlign: 'center',
  },
});

export default Home;
