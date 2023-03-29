import React, {Dispatch, FC, useCallback, useRef, useState} from 'react';
import {
  Dimensions,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  View,
  ViewToken,
} from 'react-native';
import {Character} from '../redux/types';
import CharacterItem from './CharacterListItem';
import {
  isSearching,
  loading,
  nextLink,
} from '../redux/characters/characters.slice';
import {useAppDispatch, useAppSelector} from '../redux/store';
import {getPeople} from '../redux/characters/characters.thunk';
import Loader from './ActivityIndicator.component';
import Arrow from '../assets/icons/BackArrow.svg';

const CharactersList: FC<{
  data: Character[];
  clearSearch: Dispatch<string>;
}> = ({data, clearSearch}) => {
  const dispatch = useAppDispatch();

  const nextPage = useAppSelector(nextLink);
  const load = useAppSelector(loading);
  const search = useAppSelector(isSearching);

  const listRef = useRef<FlatList<Character>>(null);

  const [toTheTopButtonVisible, setToTheTopButtonVisible] = useState(false);
  const loadMore = () => {
    if (!search && nextPage) {
      dispatch(getPeople(nextPage));
    }
  };

  const onViewableItemsChanged = useCallback(
    (info: {viewableItems: ViewToken[]; changed: ViewToken[]}) => {
      if (!info) {
        return;
      }
      const {viewableItems} = info;
      if (
        viewableItems &&
        viewableItems[0]?.index &&
        viewableItems[0].index > 10
      ) {
        setToTheTopButtonVisible(true);
      }
    },
    [],
  );
  const viewabilityConfig = {
    itemVisiblePercentThreshold: 50,
  };
  const viewabilityConfigCallbackPairs = useRef([
    {viewabilityConfig, onViewableItemsChanged},
  ]);

  const scrollToTop = () => {
    listRef.current?.scrollToIndex({index: 0, animated: true});
  };
  return (
    <View
      style={{
        position: 'relative',
        height: Dimensions.get('screen').height * 0.8,
      }}>
      <FlatList
        ref={listRef}
        data={data}
        renderItem={({item}) => (
          <CharacterItem character={item} clearSearch={clearSearch} />
        )}
        onEndReached={loadMore}
        scrollEventThrottle={250}
        onEndReachedThreshold={0.01}
        keyExtractor={item => item.id}
        ListFooterComponent={() => {
          return (
            <>
              {toTheTopButtonVisible ? (
                <TouchableOpacity
                  style={styles.toTheTopArrow}
                  onPress={scrollToTop}>
                  <Arrow
                    height={20}
                    width={20}
                    style={{transform: [{rotate: '90deg'}, {translateX: 2}]}}
                  />
                </TouchableOpacity>
              ) : null}
              {load ? <Loader /> : null}
            </>
          );
        }}
        contentContainerStyle={{paddingBottom: 100}}
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
});
export default CharactersList;
