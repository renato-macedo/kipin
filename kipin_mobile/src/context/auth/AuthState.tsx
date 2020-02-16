import React, {useReducer, Reducer} from 'react';
import AuthContext from './AuthContext';
import AuthReducer from './AuthReducer';
import setAuthToken from '../../utils/setAuthToken';
import {getData, storeData, removeItem} from '../../utils/Storage';

import {
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  Action,
  AuthStateInterface,
  FormDataInterface,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  SET_LOADING,
  LOGOUT,
  RESTORE_SESSION_ERROR,
  CLEAR_ERRORS,
  AUTH_ERROR,
  CONFIRM_COOKIE,
} from '../types';

import axios from 'axios';

// let TokenInMemory: string;
// let expiresIn: number;
let accessToken: string;

function AuthState(props: any): any {
  const initialState: AuthStateInterface = {
    token: '',
    isAuthenticated: false,
    loading: true,
    user: null,

    error: null,
  };

  const [state, dispatch] = useReducer<Reducer<AuthStateInterface, Action>>(
    AuthReducer,
    initialState,
  );

  // Login User
  async function login(formData: FormDataInterface) {
    try {
      const response = await axios.post(
        'http://192.168.25.230:3000/auth/login',
        formData,
      );

      accessToken = response.data.token;
      setAuthToken(accessToken);
      await storeData('credentials', JSON.stringify(formData));
      dispatch({
        type: LOGIN_SUCCESS,
        payload: response.data.token,
      });

      return true;
    } catch (error) {
      dispatch({
        type: LOGIN_FAIL,
        payload: error.response.data.message,
      });
      return false;
    }
  }
  // Register User
  async function register(formData: FormDataInterface) {
    try {
      const response = await axios.post(
        'http://192.168.25.230:3000/auth/register',
        formData,
      );

      await storeData('credentials', JSON.stringify(formData));
      accessToken = response.data.token;
      setAuthToken(accessToken);
      dispatch({
        type: REGISTER_SUCCESS,
        payload: response.data.token,
      });

      return true;
    } catch (error) {
      let {message} = error.response.data;

      if (message !== 'User already exists') {
        message = 'Something went wrong!';
      }
      dispatch({
        type: REGISTER_FAIL,
        payload: message,
      });
      return false;
    }
  }

  async function refreshToken(): Promise<void> {
    try {
      const response = await axios.get(
        'http://192.168.25.230:3000/auth/refresh_token',
      );

      setAuthToken(response.data.token);
      accessToken = response.data.token;

      dispatch({
        type: CONFIRM_COOKIE,
        payload: null,
      });
    } catch (error) {
      dispatch({
        type: AUTH_ERROR,
        payload: error.response.data.error,
      });
    }
  }

  async function loadUser() {
    const credentials = await getData('credentials');

    if (credentials) {
      const {email, password} = JSON.parse(credentials);

      await login({email, password});
    } else {
      dispatch({
        type: RESTORE_SESSION_ERROR,
        payload: null,
      });
    }
  }

  function clearErrors() {
    dispatch({
      type: CLEAR_ERRORS,
      payload: null,
    });
  }

  function setLoading(loading: boolean) {
    dispatch({
      type: SET_LOADING,
      payload: loading,
    });
  }

  async function logout() {
    await removeItem('credentials');
    dispatch({
      type: LOGOUT,
      payload: null,
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
        logout,
        refreshToken,
      }}>
      {props.children}
    </AuthContext.Provider>
  );
}

export default AuthState;
