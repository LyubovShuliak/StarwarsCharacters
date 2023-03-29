import React, {useCallback, useEffect, useState} from 'react';

import {SafeAreaView, StyleSheet} from 'react-native';

import {useAppDispatch, useAppSelector} from '../redux/store';
import {
  loading,
  people,
  searchedPeople,
  setLoading,
  stopSearch,
} from '../redux/characters/characters.slice';
import { getPeople, saveFavoritesToAsyncStorage, searchPeople } from "../redux/characters/characters.thunk";
import SearchInput from '../components/SearchInput.component';
import Loader from '../components/ActivityIndicator.component';
import {Character} from '../redux/types';
import CharactersList from '../components/CharacterList';
import debounce from 'lodash.debounce';
import Favorites from '../components/Favorites';
import { getAsyncStorageData } from "../redux/characters/asyncStorageApi";

const Home = () => {
  const dispatch = useAppDispatch();

  const charactersList = useAppSelector(people);
  const charactersSearchedList = useAppSelector(searchedPeople);
  const isLoading = useAppSelector(loading);

  const [charactersToDisplay, setCharactersToDisplay] = useState<Character[]>(
    [],
  );
  const [text, onChangeText] = useState('');
  const filterCharacters = debounce(() => {
    dispatch(searchPeople(text));
  }, 10);

  useEffect(() => {
    if (!charactersList.length) {
      dispatch(getPeople());
    }
  }, []);

  useEffect(() => {
    if (!isLoading) {
      setCharactersToDisplay(charactersList);
    }
  }, [isLoading]);

  useEffect(() => {
    if (text.length > 0) {
      dispatch(setLoading());
      filterCharacters();
    } else {
      dispatch(stopSearch());
      setCharactersToDisplay(charactersList);
    }
  }, [text]);

  useEffect(() => {
    if (text.length > 0) {
      if (charactersSearchedList.length) {
        setCharactersToDisplay(charactersSearchedList);
      } else {
        setCharactersToDisplay([]);
      }
    }
  }, [charactersSearchedList, charactersList]);

  return (
    <SafeAreaView style={styles.list}>
      <Favorites />
      <SearchInput text={text} onChangeText={onChangeText} />

      <CharactersList data={charactersToDisplay} clearSearch={onChangeText} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  list: {
    paddingBottom: 300,
  },
});

export default Home;
