import React, {useContext, useEffect, useCallback, useState} from 'react';
import {
  FlatList,
  RefreshControl,
  Text,
  StyleSheet,
  ScrollView,
} from 'react-native';
import Item from './Item';
import ItemsContext from '../context/Items/ItemsContext';

import {ItemInterface} from '../context/types';
function ListItem() {
  const [refreshing, setRefreshing] = useState(false);

  const {items, error, getItems, loading} = useContext(ItemsContext);

  const onRefresh = useCallback(() => {
    setRefreshing(true);

    //wait(2000).then(() => setRefreshing(false));

    getItems().then(() => setRefreshing(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refreshing]);

  useEffect(() => {
    console.log('ok ok');
    getItems();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (error) {
    return <Text>{error}</Text>;
  }
  if (loading) {
    return <Text>Loading...</Text>;
  }
  if (!loading && items && items.length > 0) {
    return (
      <FlatList
        style={styles.list}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        data={items}
        renderItem={({item}) => <Item item={item} />}
        keyExtractor={(item: ItemInterface) => item.id}
      />
    );
  }

  return (
    <ScrollView
      style={styles.scrollView}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }>
      <Text>No items</Text>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  list: {
    height: '90%',
  },
  text: {
    fontSize: 42,
  },
  scrollView: {
    height: '90%',
  },
});

export default ListItem;
