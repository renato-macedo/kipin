import React, {useState, useContext} from 'react';
import {Appbar, Menu} from 'react-native-paper';
import {StyleSheet, View} from 'react-native';
import AuthContext from '../context/auth/AuthContext';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const {logout} = useContext(AuthContext);

  function handlePress() {
    setMenuOpen(false);
    logout();
  }
  return (
    <View>
      <Appbar.Header dark={true} style={styles.header}>
        <Appbar.Content title="My List" />
        <Appbar.Action icon="magnify" />
        <Menu
          visible={menuOpen}
          onDismiss={() => setMenuOpen(false)}
          anchor={
            <Appbar.Action
              color="white"
              icon="dots-vertical"
              onPress={() => setMenuOpen(true)}
            />
          }>
          <Menu.Item onPress={handlePress} title="Log Out" />
        </Menu>
      </Appbar.Header>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#000',
  },
});
