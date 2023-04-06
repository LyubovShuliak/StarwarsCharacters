import React, { FC, useCallback, useRef, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
  ViewToken,
} from 'react-native';

import { loading, nextLink } from '../redux/characters/characters.slice';
import { getPeople } from '../redux/characters/characters.thunk';
import { useAppDispatch, useAppSelector } from '../redux/store';
import { Character } from '../redux/types';
import { COLORS, TYPOGRAPHY } from '../theme';
import { ListFooterComponent } from './CharacterListFooter';
import CharacterItem from './CharacterListItem';

const CharactersList: FC<{
  data: Character[];
  searchText: string;
}> = ({ data, searchText }) => {
  const dispatch = useAppDispatch();

  const nextPage = useAppSelector(nextLink);
  const isLoading = useAppSelector(loading);

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
    if (data.length > 0) {
      listRef.current?.scrollToIndex({ index: 0, animated: true });
    }
  };

  return (
    <View style={styles.flatlistContainer}>
      {searchText && !isLoading && !data.length ? (
        <Text style={styles.nothingFound}>No characters found</Text>
      ) : null}
      <FlatList
        ref={listRef}
        data={data}
        renderItem={({ item }) => <CharacterItem character={item} />}
        onEndReached={loadMore}
        keyExtractor={item => item.id}
        ListFooterComponent={
          <ListFooterComponent
            toTheTopButtonVisible={toTheTopButtonVisible}
            scrollToTop={scrollToTop}
            searchText={searchText}
          />
        }
        contentContainerStyle={styles.flatlist}
        initialNumToRender={10}
        viewabilityConfigCallbackPairs={viewabilityConfigCallbackPairs.current}
      />
      {searchText && isLoading ? (
        <View style={styles.loaderOverlay}>
          <ActivityIndicator size="large" color={COLORS.YELLOW} />
        </View>
      ) : null}
    </View>
  );
};
const styles = StyleSheet.create({
  flatlist: {
    width: '100%',
    justifyContent: 'center',
    alignSelf: 'center',
    padding: 10,
  },
  flatlistContainer: {
    flex: 1,
  },
  loaderOverlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 10,
    right: 10,
    backgroundColor: COLORS.OVERLAY_GREY,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  nothingFound: {
    color: COLORS.BLACK,
    fontFamily: TYPOGRAPHY.FONTS.semibold,
    textAlign: 'center',
    width: '100%',
  },
});
export default CharactersList;
