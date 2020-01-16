/* eslint-disable no-unused-vars */
import React, { useReducer, Reducer } from 'react';
import AuthContext from './AuthContext';
import AuthReducer from './AuthReducer';

import {
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  USER_LOADED,
  AUTH_ERROR,
  Action,
  iAuthState,
  iFormData
} from '../types';

import { User } from '../../types';
import axios from 'axios';

// let TokenInMemory: string;
// let expiresIn: number;
const accessToken = { token: '' }


function AuthState(props: any): any {
  const initialState: iAuthState = {
    // token: localStorage.getItem('token'),
    isAuthenticated: false,
    loading: true,
    user: null,
    error: {}
  };

  const [state, dispatch] = useReducer<Reducer<iAuthState, Action>>(
    AuthReducer,
    initialState
  );

  // Login User
  async function login(formData: iFormData) {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    try {
      const response = await axios.post(
        'http://localhost:3000/auth/login',
        formData,
        config
      );
      console.log(response.headers);

      accessToken.token = response.data.token;
      accessToken.expiresIn = response.data.expiresIn

      dispatch({
        type: LOGIN_SUCCESS,
        payload: null
      });

      loadUser();
    } catch (error) {
      dispatch({
        type: LOGIN_FAIL,
        payload: error.response.data.msg
      });
    }
  }

  async function refreshToken(): Promise<[boolean, string]> {
    try {
      const response = await axios.get('http://localhost:3000/auth/refresh_token')
      console.log(response.data)
      return [true, response.data.token]
    } catch (error) {
      console.log(error.response.data)
      return [false, error.response.data.error]
    }
  }

  // Load User
  async function loadUser() {
    console.log('TOKEN', accessToken);
    // if the token is still in memory use on the request
    if (accessToken.token) {

      setAuthToken(accessToken.token);
    }

    try {

      const response = await axios.get('http://localhost:3000/auth/user');

      // if everything is okay, load the user
      console.log('request', response.data);
      dispatch({
        type: USER_LOADED,
        payload: response.data
      });
      console.log('usuario carregado')
    } catch (error) {

      // if something went wrong, it means the token is not in memory or is expired, either way try to refresh
      console.log('no token')

      const [success, data] = await refreshToken();

      if (success) {
        console.log('success', data)
        accessToken.token = data
        console.log('calling loadUser again')
        loadUser()
      } else {
        console.log('no success')
        dispatch({
          type: AUTH_ERROR,
          payload: error.response.data.message
        });
      }
    }
  }





  function clearErrors() { }
  return (
    <AuthContext.Provider
      value={{
        //token: state.token,
        login,
        loadUser,
        loading: state.loading,
        error: state.error,
        isAuthenticated: state.isAuthenticated,
        user: state.user,
        clearErrors
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}








function setAuthToken(token: string) {
  console.log({ token });
  if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete axios.defaults.headers.common['Authorization'];
  }
}




export default AuthState;
