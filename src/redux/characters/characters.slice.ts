import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {
  getFavoritesFromAsyncStorage,
  getPeople,
  searchPeople,
} from './characters.thunk';
import {Character, GENDER, InitialState} from '../types';

import {RootState} from '../store';

const initialState: InitialState = {
  nextPage: '',
  characters: [],
  searchedCharacters: [],
  fans: {
    [GENDER.MALE]: {number: 0, title: 'Male'},
    [GENDER.FEMALE]: {number: 0, title: 'Female'},
    [GENDER.OTHER]: {number: 0, title: 'Other'},
  },
  status: true,
  loading: false,
  favsUriList: [],
  search: false,
  favoritesUploadedFromStorage: false,
};

export const characterSlice = createSlice({
  name: 'characters',
  initialState,
  reducers: {
    setLoading: state => {
      state.loading = true;
    },
    addToFavs: (
      state,
      action: PayloadAction<{
        uri: string;
        gender: GENDER;
      }>,
    ) => {
      state.favsUriList.push(action.payload.uri);
      state.fans[action.payload.gender].number++;
    },
    removeFromFavs: (
      state,
      action: PayloadAction<{
        uri: string;
        gender: GENDER;
      }>,
    ) => {
      state.favsUriList = state.favsUriList.filter(
        url => url !== action.payload.uri,
      );
      state.fans[action.payload.gender].number--;
    },

    stopSearch: state => {
      state.search = false;
    },
    clearState: state => {
      state.fans = initialState.fans;
      state.favsUriList = initialState.favsUriList;
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
      state.search = true;
    });

    builder.addCase(searchPeople.rejected, state => {
      state.loading = false;
      state.status = false;
    });
    builder.addCase(getFavoritesFromAsyncStorage.fulfilled, (state, action) => {
      if (action.payload.data) {
        state.fans = action.payload.data.fans;
        state.favsUriList = action.payload.data.favsUriList;
      }
      state.favoritesUploadedFromStorage = true;
    });
    builder.addCase(getFavoritesFromAsyncStorage.pending, state => {
      state.favoritesUploadedFromStorage = false;
      state.search = true;
    });

    builder.addCase(getFavoritesFromAsyncStorage.rejected, state => {
      state.favoritesUploadedFromStorage = true;
      state.status = false;
    });
  },
});

export const {setLoading, addToFavs, removeFromFavs, stopSearch, clearState} =
  characterSlice.actions;

export const people = (state: RootState) => state.characters.characters;
export const searchedPeople = (state: RootState) =>
  state.characters.searchedCharacters;
export const loading = (state: RootState) => state.characters.loading;
export const nextLink = (state: RootState) => state.characters.nextPage;
export const fansByCategory = (state: RootState) => state.characters.fans;
export const favs = (state: RootState) => state.characters.favsUriList;
export const isSearching = (state: RootState) => state.characters.search;
export const favsUploaded = (state: RootState) => state.characters.favoritesUploadedFromStorage;
export const charactersReducer = characterSlice.reducer;
