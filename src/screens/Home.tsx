import { throttle } from 'lodash';
import React, { useEffect, useState } from 'react';
import { Dimensions, SafeAreaView, StyleSheet } from 'react-native';

import CharactersList from '../components/CharacterList';
import Header from '../components/Header';
import {
  loading,
  people,
  searchedPeople,
  setLoading,
} from '../redux/characters/characters.slice';
import { getPeople, searchPeople } from '../redux/characters/characters.thunk';
import { useAppDispatch, useAppSelector } from '../redux/store';
import { Character } from '../redux/types';

const Home = () => {
  const dispatch = useAppDispatch();

  const charactersList = useAppSelector(people);
  const charactersSearchedList = useAppSelector(searchedPeople);
  const isLoading = useAppSelector(loading);

  const [charactersToDisplay, setCharactersToDisplay] = useState<Character[]>(
    []
  );
  const [searchText, setSearchText] = useState('');
  const filterCharacters = throttle(() => {
    dispatch(searchPeople(searchText));
  }, 500);

  useEffect(() => {
    if (!charactersList.length) {
      dispatch(getPeople());
    }
  }, [charactersList]);

  useEffect(() => {
    if (searchText.length > 0) {
      dispatch(setLoading());
      filterCharacters();
    }
  }, [searchText]);

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

  const clearSearch = () => setSearchText('');

  return (
    <SafeAreaView style={styles.list}>
      <Header searchText={searchText} setSearchText={setSearchText} />
      <CharactersList
        data={charactersToDisplay}
        clearSearch={clearSearch}
        searchText={searchText}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  list: {
    height: Dimensions.get('screen').height,
  },
});

export default Home;
