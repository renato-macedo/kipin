import React from 'react';
import {Text, Button} from 'react-native';

const Signup = (props: any) => (
  <>
    <Text>Sign Up</Text>
    <Button title="Back to Login" onPress={() => props.navigation.goBack()} />
  </>
);

export default Signup;
