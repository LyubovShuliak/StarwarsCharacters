export type Character = {
  id: string;
  birth_year: string;
  eye_color: string;
  films: string[];
  gender: GENDER;
  hair_color: string;
  height: string;
  homeworld: string;
  mass: string;
  name: string;
  skin_color: string;
  created: string;
  edited: string;
  species: string[];
  starships: string[];
  url: string;
  vehicles: string[];
};
export enum GENDER {
  MALE = 'male',
  FEMALE = 'female',
  OTHER = 'other',
}
export type Favorite = { title: string; number: number };
export type Fans = {
  [key in GENDER]: Favorite;
};

export type InitialState = {
  nextPage: string;
  status: boolean;
  characters: Character[] | [];
  searchedCharacters: Character[] | [];
  fans: Fans;
  loading: boolean;

  favoritesUriList: string[];

  favoritesUploadedFromStorage: boolean;
};
