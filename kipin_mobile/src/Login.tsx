import React, {useState, useContext} from 'react';
import {View, StyleSheet, KeyboardAvoidingView, Alert} from 'react-native';
import {TextInput, Button, Title} from 'react-native-paper';
import AuthContext from './context/auth/AuthContext';

function Login(props: any) {
  const {login, error} = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function handleSubmit() {
    if (email && password) {
      const success = await login({email, password});
      success
        ? props.navigation.navigate('Main')
        : Alert.alert('Invalid credentials', error);
    } else {
      Alert.alert('Invalid credentials', error);
    }
  }

  return (
    <KeyboardAvoidingView style={styles.container} behavior="height">
      <View style={styles.title_container}>
        <Title>Kipin</Title>
      </View>
      <View style={styles.input_container}>
        <TextInput
          style={styles.input}
          autoCapitalize="none"
          label="Email"
          keyboardType="email-address"
          onChangeText={text => setEmail(text)}
        />
        <TextInput
          style={styles.input}
          maxLength={50}
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
          Login In
        </Button>
        <Button
          style={styles.signup_btn}
          onPress={() => props.navigation.navigate('Signup')}>
          Not Account Yet? Sign Up Now
        </Button>
        <Button style={styles.signup_btn}>Forget Your Password?</Button>
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

    height: 200,
  },
  input: {
    marginBottom: 30,
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

export default Login;
