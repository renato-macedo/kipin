import React, {useContext, useEffect} from 'react';
import {FlatList, RefreshControl, Text} from 'react-native';
import Item from './ListItem';
import ItemsContext from '../context/Items/ItemsContext';
const wait = (time: number) => new Promise(res => setTimeout(res, time));

function ListItem() {
  const [refreshing, setRefreshing] = React.useState(false);
  const {items, error, getItems} = useContext(ItemsContext);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);

    wait(2000).then(() => setRefreshing(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refreshing]);

  useEffect(() => {
    getItems();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    console.log(error, items);
  }, [error, items]);
  if (error) {
    return <Text>{error}</Text>;
  }
  if (items && items.length > 0) {
    return (
      <FlatList
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
export default ListItem;
