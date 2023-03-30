import React, { FC, useCallback, useRef, useState } from 'react';
import { FlatList, StyleSheet, View, ViewToken } from 'react-native';

import { loading, nextLink } from '../redux/characters/characters.slice';
import { getPeople } from '../redux/characters/characters.thunk';
import { useAppDispatch, useAppSelector } from '../redux/store';
import { Character } from '../redux/types';
import { ListFooterComponent } from './CharacterListFooter';
import CharacterItem from './CharacterListItem';

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
        height: '100%',
      }}
    >
      <FlatList
        ref={listRef}
        data={data}
        renderItem={({ item }) => (
          <CharacterItem character={item} clearSearch={clearSearch} />
        )}
        onEndReached={loadMore}
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
  flatlist: { paddingBottom: 100, width: '100%' },
});
export default CharactersList;
