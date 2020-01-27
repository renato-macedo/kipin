/* eslint-disable react-native/no-inline-styles */
import React from 'react';

import {View, Text, Button} from 'react-native';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

const HomeScreen = (props: any) => {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>Home Screen</Text>
      <Button
        title="Go to Details"
        onPress={() => props.navigation.navigate('Details')}
      />
    </View>
  );
};

const Details = (props: any) => {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>Details Screen</Text>
      <Button title="Go back" onPress={() => props.navigation.goBack()} />
    </View>
  );
};

const AppNavigator = createStackNavigator(
  {
    Home: HomeScreen,
    Details: Details,
  },
  {
    initialRouteName: 'Home',
  },
);

export default createAppContainer(AppNavigator);
