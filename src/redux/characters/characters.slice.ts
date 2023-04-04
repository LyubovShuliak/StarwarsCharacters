import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { RootState } from '../store';
import { Character, GENDER, InitialState } from '../types';
import {
  getFavoritesFromAsyncStorage,
  getPeople,
  searchPeople,
} from './characters.thunk';

const initialState: InitialState = {
  nextPage: '',
  characters: [],
  searchedCharacters: [],
  fans: {
    [GENDER.MALE]: { number: 0, title: 'Male' },
    [GENDER.FEMALE]: { number: 0, title: 'Female' },
    [GENDER.OTHER]: { number: 0, title: 'Other' },
  },
  status: true,
  loading: false,
  favoritesUriList: [],
  favoritesReceived: false,
};

export const characterSlice = createSlice({
  name: 'characters',
  initialState,
  reducers: {
    setLoading: state => {
      state.loading = true;
    },
    addToFavorites: (
      state,
      action: PayloadAction<{
        uri: string;
        gender: GENDER;
      }>
    ) => {
      state.favoritesUriList.push(action.payload.uri);
      state.fans[action.payload.gender].number++;
    },
    removeFromFavorites: (
      state,
      action: PayloadAction<{
        uri: string;
        gender: GENDER;
      }>
    ) => {
      state.favoritesUriList = state.favoritesUriList.filter(
        url => url !== action.payload.uri
      );
      state.fans[action.payload.gender].number--;
    },

    clearState: state => {
      state.fans = initialState.fans;
      state.favoritesUriList = initialState.favoritesUriList;
    },
  },
  extraReducers: builder => {
    builder.addCase(getPeople.fulfilled, (state, action) => {
      (state.characters as Character[]).push(...action.payload.people);
      state.status = action.payload.status;
      state.loading = false;
      state.nextPage = action.payload.nextPage || '';
    });

    builder.addCase(getPeople.pending, state => {
      state.loading = true;
    });

    builder.addCase(getPeople.rejected, state => {
      state.loading = false;
      state.status = false;
    });
    builder.addCase(searchPeople.fulfilled, (state, action) => {
      state.searchedCharacters = action.payload.people;
      state.loading = false;
    });

    builder.addCase(searchPeople.pending, state => {
      state.loading = true;
    });

    builder.addCase(searchPeople.rejected, state => {
      state.loading = false;
      state.status = false;
    });
    builder.addCase(getFavoritesFromAsyncStorage.fulfilled, (state, action) => {
      if (action.payload.data) {
        state.fans = action.payload.data.fans;
        state.favoritesUriList = action.payload.data.favoritesUriList;
      }
      state.favoritesReceived = true;
    });
    builder.addCase(getFavoritesFromAsyncStorage.pending, state => {
      state.favoritesReceived = false;
    });

    builder.addCase(getFavoritesFromAsyncStorage.rejected, state => {
      state.favoritesReceived = true;
    });
  },
});

export const { setLoading, addToFavorites, removeFromFavorites, clearState } =
  characterSlice.actions;

export const status = (state: RootState) => state.characters.status;
export const people = (state: RootState) => state.characters.characters;
export const searchedPeople = (state: RootState) =>
  state.characters.searchedCharacters;
export const loading = (state: RootState) => state.characters.loading;
export const nextLink = (state: RootState) => state.characters.nextPage;
export const fansByCategory = (state: RootState) => state.characters.fans;
export const favoritesArray = (state: RootState) =>
  state.characters.favoritesUriList;
export const favoritesReceivedFromStorage = (state: RootState) =>
  state.characters.favoritesReceived;
export const charactersReducer = characterSlice.reducer;
