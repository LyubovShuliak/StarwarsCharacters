import React, { FC, useCallback, useRef, useState } from 'react';
import {
  Dimensions,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewToken,
} from 'react-native';

import Arrow from '../assets/icons/BackArrow.svg';
import { loading, nextLink } from '../redux/characters/characters.slice';
import { getPeople } from '../redux/characters/characters.thunk';
import { useAppDispatch, useAppSelector } from '../redux/store';
import { Character } from '../redux/types';
import { COLORS, TYPOGRAPHY } from '../theme';
import Loader from './ActivityIndicator.component';
import CharacterItem from './CharacterListItem';

const ListFooterComponent: FC<{
  toTheTopButtonVisible: boolean;
  scrollToTop: () => void;
  load: boolean;
  nextPage: string;
  searchText: string;
}> = ({ toTheTopButtonVisible, scrollToTop, load, searchText, nextPage }) => {
  return (
    <>
      {toTheTopButtonVisible && !searchText ? (
        <TouchableOpacity style={styles.toTheTopArrow} onPress={scrollToTop}>
          <Arrow
            height={20}
            width={20}
            style={{
              transform: [{ rotate: '90deg' }, { translateX: 2 }],
            }}
          />
        </TouchableOpacity>
      ) : null}
      {load ? <Loader /> : null}

      {!nextPage && !searchText && !load ? (
        <Text style={styles.lastPageNotify}>No more characters</Text>
      ) : null}
    </>
  );
};
const CharactersList: FC<{
  data: Character[];
  clearSearch: () => void;
  searchText: string;
}> = ({ data, clearSearch, searchText }) => {
  const dispatch = useAppDispatch();

  const nextPage = useAppSelector(nextLink);
  const load = useAppSelector(loading);

  const listRef = useRef<FlatList<Character>>(null);

  const [toTheTopButtonVisible, setToTheTopButtonVisible] = useState(false);
  const loadMore = () => {
    if (!searchText && nextPage) {
      dispatch(getPeople(nextPage));
    }
  };

  const onViewableItemsChanged = useCallback(
    (info: { viewableItems: ViewToken[]; changed: ViewToken[] }) => {
      if (!info) {
        return;
      }
      const { viewableItems } = info;
      if (
        viewableItems &&
        viewableItems[0]?.index &&
        viewableItems[0].index > 10
      ) {
        setToTheTopButtonVisible(true);
      }
    },
    []
  );
  const viewabilityConfig = {
    itemVisiblePercentThreshold: 50,
  };
  const viewabilityConfigCallbackPairs = useRef([
    { viewabilityConfig, onViewableItemsChanged },
  ]);

  const scrollToTop = () => {
    listRef.current?.scrollToIndex({ index: 0, animated: true });
  };

  return (
    <View
      style={{
        height: Dimensions.get('screen').height * 0.8,
      }}
    >
      <FlatList
        ref={listRef}
        data={data}
        renderItem={({ item }) => (
          <CharacterItem character={item} clearSearch={clearSearch} />
        )}
        onEndReached={loadMore}
        scrollEventThrottle={250}
        onEndReachedThreshold={0.1}
        keyExtractor={item => item.id}
        ListFooterComponent={
          <ListFooterComponent
            toTheTopButtonVisible={toTheTopButtonVisible}
            scrollToTop={scrollToTop}
            load={load}
            nextPage={nextPage}
            searchText={searchText}
          />
        }
        contentContainerStyle={styles.flatlist}
        initialNumToRender={10}
        viewabilityConfigCallbackPairs={viewabilityConfigCallbackPairs.current}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  toTheTopArrow: {
    height: 40,
    zIndex: 100,
    alignSelf: 'center',
    padding: 10,
    borderRadius: 30,
  },
  lastPageNotify: {
    color: COLORS.BLACK,
    fontFamily: TYPOGRAPHY.FONTS.semibold,
    textAlign: 'center',
    width: Dimensions.get('screen').width,
  },
  flatlist: { paddingBottom: 100 },
});
export default CharactersList;
