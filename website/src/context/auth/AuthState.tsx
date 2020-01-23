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
  LOGOUT
} from '../types';

import axios from 'axios';

// let TokenInMemory: string;
// let expiresIn: number;
let accessToken: string;

function AuthState(props: any): any {
  const initialState: AuthStateInterface = {
    token: accessToken,
    isAuthenticated: false,
    loading: false,
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

      dispatch({
        type: LOGIN_SUCCESS,
        payload: response.data.token
      });

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

  async function refreshToken(): Promise<[boolean, string]> {
    try {
      const response = await axios.get(
        'http://localhost:3000/auth/refresh_token'
      );
      // console.log(response.data);
      return [true, response.data.token];
    } catch (error) {
      // console.log(error.response.data);
      return [false, error.response.data.error];
    }
  }

  // Load User
  async function loadUser() {
    // console.log('TOKEN', accessToken);
    // if the token is still in memory use on the request
    if (accessToken) {
      setAuthToken(accessToken);
    }

    try {
      const response = await axios.get('http://localhost:3000/auth/user');

      // if everything is okay, load the user
      // console.log('request', response.data);
      dispatch({
        type: USER_LOADED,
        payload: response.data
      });

      // console.log('usuario carregado');
    } catch (error) {
      // if something went wrong, it means the token is not in memory or is expired, either way try to refresh
      // console.log('no token');

      const [success, data] = await refreshToken();

      if (success) {
        // console.log('success', data);
        accessToken = data;
        // console.log('calling loadUser again');
        loadUser();
      } else {
        // console.log('no success');
        dispatch({
          type: AUTH_ERROR,
          payload: error.response.data.message
        });
      }
    }
  }

  function clearErrors() {}

  function setLoading(loading: boolean) {
    dispatch({
      type: SET_LOADING,
      payload: loading
    });
  }

  function logout() {
    dispatch({
      type: LOGOUT,
      payload: null
    });
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
        logout
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}

export default AuthState;
