import React, {useState} from 'react';
import {View, StyleSheet, KeyboardAvoidingView} from 'react-native';
import {TextInput, Button, Title} from 'react-native-paper';

function Signup(props: any) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  function handleSubmit() {}
  return (
    <KeyboardAvoidingView style={styles.container} behavior="height">
      <View style={styles.title_container}>
        <Title>Kipin</Title>
      </View>
      <View style={styles.input_container}>
        <TextInput
          maxLength={50}
          style={styles.input}
          label="Name"
          onChangeText={text => setName(text)}
        />
        <TextInput
          style={styles.input}
          autoCapitalize="none"
          label="Email"
          keyboardType="email-address"
          onChangeText={text => setEmail(text)}
        />
        <TextInput
          maxLength={50}
          style={styles.input}
          label="Password"
          secureTextEntry={true}
          onChangeText={text => setPassword(text)}
        />
      </View>
      <View style={styles.btn_container}>
        <Button
          style={styles.login_btn}
          mode="contained"
          onPress={handleSubmit}>
          Sign Up
        </Button>
        <Button
          style={styles.signup_btn}
          onPress={() => props.navigation.goBack()}>
          Back to Login
        </Button>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

    padding: 10,
  },
  title_container: {
    height: '20%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  input_container: {
    padding: 10,

    height: 250,
  },
  input: {
    marginBottom: 20,
  },
  btn_container: {
    justifyContent: 'space-around',
    height: '30%',
    // marginTop: 100,
  },
  login_btn: {
    height: 50,
    margin: 10,
    textAlign: 'center',
  },
  signup_btn: {
    margin: 10,
  },
});

export default Signup;
