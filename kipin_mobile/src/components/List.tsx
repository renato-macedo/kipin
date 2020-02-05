import React, {useContext, useEffect, useCallback, useState} from 'react';
import {FlatList, RefreshControl, Text, StyleSheet} from 'react-native';
import Item from './ListItem';
import ItemsContext from '../context/Items/ItemsContext';

const wait = (time: number) => new Promise(res => setTimeout(res, time));

function ListItem() {
  const [refreshing, setRefreshing] = useState(false);
  const {items, error, getItems} = useContext(ItemsContext);

  const onRefresh = useCallback(() => {
    setRefreshing(true);

    //wait(2000).then(() => setRefreshing(false));
    console.log('asa asa');
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
  if (items && items.length > 0) {
    return (
      <FlatList
        style={styles.list}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        data={items}
        renderItem={({item}) => <Item title={item.title} />}
        keyExtractor={item => item.id}
      />
    );
  }

  return <Text>No Items</Text>;
}
const styles = StyleSheet.create({
  list: {
    height: '90%',
  },
  text: {
    fontSize: 42,
  },
});

export default ListItem;
