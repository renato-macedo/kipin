/* eslint-disable no-unused-vars */
import React, { useReducer, Reducer } from 'react';
import AuthContext from './AuthContext';
import AuthReducer from './AuthReducer';
import setAuthToken from '../../utils/setAuthToken';
import {
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  USER_LOADED,
  AUTH_ERROR,
  Action,
  AuthStateInterface,
  FormDataInterface,
  User,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  SET_LOADING,
  LOGOUT,
  CONFIRM_COOKIE
} from '../types';

import axios from 'axios';

// let TokenInMemory: string;
// let expiresIn: number;
let accessToken: string;

function AuthState(props: any): any {
  const initialState: AuthStateInterface = {
    token: accessToken,
    isAuthenticated: false,
    loading: true,
    user: null,
    error: null
  };

  const [state, dispatch] = useReducer<Reducer<AuthStateInterface, Action>>(
    AuthReducer,
    initialState
  );

  // Login User
  async function login(formData: FormDataInterface) {
    try {
      const response = await axios.post(
        'http://localhost:3000/auth/login',
        formData
      );
      // console.log(response.headers);

      accessToken = response.data.token;
      setAuthToken(accessToken);
      dispatch({
        type: LOGIN_SUCCESS,
        payload: response.data.token
      });
      tellExtensionItsAuthenticated(response.data);
      loadUser();
    } catch (error) {
      dispatch({
        type: LOGIN_FAIL,
        payload: error.response.data.message
      });
    }
  }
  // Register User
  async function register(formData: FormDataInterface) {
    try {
      const response = await axios.post(
        'http://localhost:3000/auth/register',
        formData
      );
      // // console.log(response.headers);

      accessToken = response.data.token;
      setAuthToken(accessToken);
      dispatch({
        type: REGISTER_SUCCESS,
        payload: response.data.token
      });

      loadUser();
    } catch (error) {
      let { message } = error.response.data;
      // console.log({ message });
      if (message !== 'User already exists') {
        message = 'Something went wrong!';
      }
      dispatch({
        type: REGISTER_FAIL,
        payload: message
      });
    }
  }

  async function refreshToken(): Promise<void> {
    try {
      const response = await axios.get(
        'http://localhost:3000/auth/refresh_token'
      );
      // console.log(response.data);
      setAuthToken(response.data.token);
      accessToken = response.data.token;
      //tellExtensionItsAuthenticated(response.data);

      dispatch({
        type: CONFIRM_COOKIE,
        payload: null
      });
      //return [true, response.data.token];
    } catch (error) {
      dispatch({
        type: AUTH_ERROR,
        payload: error.response.data.error
      });

      //return [false, error.response.error];
    }
    // document.removeEventListener('listening', e => {
    //   if (accessToken) {
    //     tellExtensionItsAuthenticated({ token: accessToken });
    //   }
    // });
  }

  async function loadUser() {
    document.addEventListener('listening', e => {
      console.log('listening event fired');
      if (accessToken) {
        tellExtensionItsAuthenticated({ token: accessToken });
      }
    });
    try {
      const response = await axios.get('http://localhost:3000/auth/user');
      dispatch({
        type: USER_LOADED,
        payload: response.data
      });
    } catch (error) {
      dispatch({
        type: AUTH_ERROR,
        payload: error.response.data.message
      });
    }
  }

  function clearErrors() {}

  function setLoading(loading: boolean) {
    dispatch({
      type: SET_LOADING,
      payload: loading
    });
  }

  async function logout() {
    try {
      const response = await axios.get('http://localhost:3000/auth/logout');
      dispatch({
        type: LOGOUT,
        payload: null
      });
    } catch (error) {
      dispatch({
        type: AUTH_ERROR,
        payload: 'Something went wrong'
      });
    }
  }
  return (
    <AuthContext.Provider
      value={{
        //token: state.token,
        login,
        loadUser,
        register,
        loading: state.loading,
        error: state.error,
        isAuthenticated: state.isAuthenticated,
        user: state.user,
        clearErrors,
        setLoading,
        logout,
        refreshToken
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}

function tellExtensionItsAuthenticated(data: any) {
  const LoginEvent = new CustomEvent('login', { detail: { data } });
  document.dispatchEvent(LoginEvent);
  console.log('dispatch login event');
}

export default AuthState;
