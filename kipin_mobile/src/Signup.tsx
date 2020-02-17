import React, {useState, useContext} from 'react';
import {View, StyleSheet, KeyboardAvoidingView} from 'react-native';
import {TextInput, Button, Title} from 'react-native-paper';
import * as Yup from 'yup';
import AppContext from './context/AppContext';
import ErrorDialog from './components/ErrorDialog';

const validationSchema = Yup.object({
  name: Yup.string().max(50, 'Name must be 50 characters or less'),
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  password: Yup.string()
    .min(6, 'Password must have at least 6 characters')
    .max(20, 'Password must be 20 characters or less')
    .required('Password is required'),
});

function Signup(props: any) {
  const {register, error, clearErrors, setLoading, loading} = useContext(
    AppContext,
  );
  const [validateError, setValidateError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [visible, setVisible] = useState(!!error);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  async function handleSubmit() {
    try {
      setLoading(true);
      await validationSchema.validate({email, password, name});

      const success = register({email, password, name});
      if (!success) {
        setVisible(true);
        setLoading(false);
      }
    } catch (err) {
      setErrorMessage(err.errors[0]);
      setValidateError(true);
      setVisible(true);
    }
  }

  function onDismiss() {
    setVisible(false);
    clearErrors();
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
            style={styles.signup_btn}
            disabled={loading}
            mode="contained"
            onPress={handleSubmit}>
            Sign Up
          </Button>
          <Button
            style={styles.back_btn}
            onPress={() => props.navigation.goBack()}>
            Back to Login
          </Button>
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
  signup_btn: {
    height: 50,
    margin: 10,
    textAlign: 'center',
    padding: 7,
  },
  back_btn: {
    margin: 10,
  },
});

export default Signup;
