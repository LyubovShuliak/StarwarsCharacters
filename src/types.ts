import { StackScreenProps } from '@react-navigation/stack';

import { Character } from './redux/types';

export type RootStackParamList = {
  Home: undefined;
  Character: { data: Character };
};

export type RootStackScreenProps<T extends keyof RootStackParamList> =
  StackScreenProps<RootStackParamList, T>;
