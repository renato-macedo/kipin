import React, {useContext, useState} from 'react';
import {View, StyleSheet, KeyboardAvoidingView} from 'react-native';
import {TextInput, Button, Title} from 'react-native-paper';
import AuthContext from './context/auth/AuthContext';

import * as Yup from 'yup';
import ErrorDialog from './components/ErrorDialog';

const validationSchema = Yup.object({
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  password: Yup.string()
    .min(6, 'Password must at least 6 characters')
    .max(20, 'Password must be 20 characters or less')
    .required('Password is required'),
});

function Login(props: any) {
  const {login, error, clearErrors, loading, setLoading} = useContext(
    AuthContext,
  );
  const [validateError, setValidateError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [visible, setVisible] = useState(error);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function handleFormSubmit() {
    try {
      setLoading(true);
      await validationSchema.validate({email, password});
      const success = await login({email, password});
      if (!success) {
        setVisible(true);
        setLoading(false);
      }
    } catch (err) {
      setLoading(false);
      setErrorMessage(err.errors[0]);
      setValidateError(true);
      setVisible(true);
    }
  }

  function onDismiss() {
    clearErrors();
    setVisible(false);
  }

  return (
    <KeyboardAvoidingView style={styles.container} behavior="height">
      <View style={styles.title_container}>
        <Title>Kipin</Title>
      </View>

      <View>
        <View style={styles.input_container}>
          {validateError && (
            <ErrorDialog
              visible={visible}
              onDismiss={onDismiss}
              message={errorMessage}
            />
          )}

          {error && (
            <ErrorDialog
              visible={visible}
              onDismiss={onDismiss}
              message={error}
            />
          )}

          <TextInput
            style={styles.input}
            autoCapitalize="none"
            label="Email"
            keyboardType="email-address"
            onChangeText={text => setEmail(text)}
          />
          <TextInput
            style={styles.input}
            maxLength={20}
            label="Password"
            secureTextEntry={true}
            onChangeText={text => setPassword(text)}
          />
        </View>
        <View style={styles.btn_container}>
          <Button
            disabled={loading}
            style={styles.login_btn}
            mode="contained"
            onPress={handleFormSubmit}>
            Login In
          </Button>
          <Button
            style={styles.signup_btn}
            onPress={() => props.navigation.navigate('Signup')}>
            Not Account Yet? Sign Up Now
          </Button>
          <Button style={styles.signup_btn}>Forget Your Password?</Button>
        </View>
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
    height: '15%',
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
    padding: 7,
  },
  signup_btn: {
    margin: 10,
  },
});

export default Login;
