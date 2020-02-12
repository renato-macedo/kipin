import React, {useState, useContext} from 'react';
import {List, TouchableRipple, Avatar, Menu, Divider} from 'react-native-paper';
import {ItemInterface} from 'src/context/types';
import {View, Linking} from 'react-native';
import ItemsContext from '../context/Items/ItemsContext';

// import {Image} from 'react-native';
export default function Item({
  item: {id, title, body, image, description},
}: {
  item: ItemInterface;
}) {
  const [menuOpen, setMenuOpen] = useState(false);
  const {deleteItem} = useContext(ItemsContext);
  function handleDelete() {
    deleteItem(id);
  }
  function handleOpen() {
    Linking.openURL(body).catch(err => console.error('An error occurred', err));
  }
  return (
    <View>
      <List.Item
        title={title}
        description={description ? description : body}
        left={() => (
          <List.Icon
            icon={() => (
              <Avatar.Image
                size={48}
                source={{
                  uri: image,
                }}
              />
            )}
          />
        )}
        onPress={handleOpen}
        right={() => (
          <Menu
            visible={menuOpen}
            onDismiss={() => setMenuOpen(false)}
            anchor={
              <TouchableRipple
                onPress={() => setMenuOpen(true)}
                rippleColor="rgba(0, 0, 0, .32)">
                <List.Icon icon="dots-vertical" />
              </TouchableRipple>
            }>
            <Menu.Item onPress={handleDelete} title="Delete" />
          </Menu>
        )}
      />
      <Divider />
    </View>
  );
}
