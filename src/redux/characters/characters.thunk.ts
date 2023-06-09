import { createAsyncThunk, nanoid } from '@reduxjs/toolkit';
import axios from 'axios';

import { BASE_URL, FAVS_ASYNC_STORAGE_KEY } from '../../constants';
import { Character, Fans, GENDER } from '../types';
import { getAsyncStorageData, storeData } from './asyncStorageApi';

export type AsyncStorageData = { fans: Fans; favoritesUriList: string[] };

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
  {
    people: Character[];
    status: boolean;
    nextPage?: string;
    errorMessage?: string;
  },
  string | undefined
>('characters/get', async url => {
  try {
    const {
      data: { next, results },
    }: {
      data: {
        next: string;
        results: Character[];
      };
    } = await axios.get(url || BASE_URL, {
      responseType: 'json',
    });

    const people: Character[] = mapCharacters(results);

    return { people: people, status: true, nextPage: next };
  } catch (error) {
    if (error instanceof Error) {
      return {
        people: [],
        status: false,
        errorMessage: error?.message || '',
      };
    }
    return {
      people: [],
      status: false,
    };
  }
});
export const searchPeople = createAsyncThunk<
  { people: Character[]; errorMessage?: string },
  string
>('characters/search', async value => {
  try {
    const response = await axios.get(`${BASE_URL}?search=${value}`, {
      responseType: 'json',
    });
    const result = (await response.data) as {
      next: string;
      results: Character[];
    };
    const people: Character[] = mapCharacters(result.results);

    return { people: people };
  } catch (error) {
    if (error instanceof Error) {
      return {
        people: [],
        status: false,
        errorMessage: error?.message || '',
      };
    }
    return {
      people: [],
      status: false,
    };
  }
});

export const saveFavoritesToAsyncStorage = createAsyncThunk<
  { status: boolean },
  AsyncStorageData
>('favorites/save', props => {
  try {
    storeData({ props, key: FAVS_ASYNC_STORAGE_KEY });

    return { status: true };
  } catch (error) {
    return { status: false };
  }
});

export const getFavoritesFromAsyncStorage = createAsyncThunk<
  { status: boolean; data?: AsyncStorageData },
  string
>('favorites/get', async key => {
  try {
    const data: AsyncStorageData | null = await getAsyncStorageData(key);
    if (!data) {
      return { status: false };
    } else {
      return { status: true, data };
    }
  } catch (error) {
    return { status: false };
  }
});
