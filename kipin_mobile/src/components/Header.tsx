import React from 'react';
import {Appbar} from 'react-native-paper';
import {StyleSheet} from 'react-native';

export default class MyComponent extends React.Component {
  _handleSearch = () => console.log('Searching');

  _handleMore = () => console.log('Shown more');

  render() {
    return (
      <Appbar.Header dark={true} style={styles.header}>
        <Appbar.Content title="My List" />
        <Appbar.Action icon="magnify" onPress={this._handleSearch} />
        <Appbar.Action icon="dots-vertical" onPress={this._handleMore} />
      </Appbar.Header>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#000',
  },
});
