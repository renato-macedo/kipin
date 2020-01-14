import React, { useReducer, Reducer, ProviderProps } from 'react';
import AuthContext from './AuthContext';
import AuthReducer from './AuthReducer';
import {
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  USER_LOADED,
  AUTH_ERROR,
  Action,
  iAuthState
} from '../types';

import { User } from '../../types';
import axios from 'axios';

function setAuthToken(token: string) {
  if (token) {
    axios.defaults.headers.common['x-auth-token'] = token;
  } else {
    delete axios.defaults.headers.common['x-auth-token'];
  }
}

function AuthState(props: ProviderProps<any>): any {
  const initialState: iAuthState = {
    token: localStorage.getItem('token'),
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
  async function login(formData: any) {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    try {
      const response = await axios.post('/api/auth', formData, config);
      dispatch({
        type: LOGIN_SUCCESS,
        payload: response.data
      });

      loadUser();
    } catch (error) {
      dispatch({
        type: LOGIN_FAIL,
        payload: error.response.data.msg
      });
    }
  }
  // Load User
  async function loadUser() {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }

    try {
      console.log('request');
      const response = await axios.get('/api/auth');
      dispatch({
        type: USER_LOADED,
        payload: response.data
      });
    } catch (error) {
      dispatch({
        type: AUTH_ERROR,
        payload: { token: '' }
      });
    }
  }

  return (
    <AuthContext.Provider
      value={{
        token: state.token,
        login,
        loadUser,
        loading: state.loading,
        error: state.error,
        isAuthenticated: state.isAuthenticated,
        user: state.user
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}

export default AuthState;
