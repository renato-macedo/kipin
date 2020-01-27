import React from 'react';
import {Text, Button} from 'react-native';

const Login = (props: any) => (
  <>
    <Text>Login</Text>
    <Button title="App" onPress={() => props.navigation.navigate('Main')} />
    <Button
      title="Sign Up"
      onPress={() => props.navigation.navigate('Signup')}
    />
  </>
);

export default Login;
