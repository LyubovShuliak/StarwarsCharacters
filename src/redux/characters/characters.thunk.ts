import {createAsyncThunk, nanoid} from '@reduxjs/toolkit';
import {Character, GENDER} from '../types';
import {BASE_URL} from '../../constants';

const mapCharacters = (data: Character[]) => {
  return data.map((character: Character) => ({
    ...character,
    gender:
      character.gender === GENDER.MALE || character.gender === GENDER.FEMALE
        ? character.gender
        : GENDER.OTHER,
    id: nanoid(),
  }));
};
export const getPeople = createAsyncThunk<
  {people: Character[]; status: boolean; nextPage?: string},
  string | undefined
>('characters/get', async url => {
  try {
    const response = await fetch(url || BASE_URL);
    const result = await response.json();

    const people: Character[] = mapCharacters(result.results);

    return {people: people, status: true, nextPage: result.next};
  } catch (error) {
    return {people: [], status: false};
  }
});
export const searchPeople = createAsyncThunk<{people: Character[]}, string>(
  'characters/search',
  async value => {
    try {
      const response = await fetch(`${BASE_URL}?search=${value}`);
      const result = await response.json();
      const people: Character[] = mapCharacters(result.results);

      return {people: people};
    } catch (error) {
      return {people: []};
    }
  },
);
