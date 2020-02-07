import React, {useReducer, Reducer} from 'react';
import AuthContext from './AuthContext';
import AuthReducer from './AuthReducer';
import setAuthToken from '../../utils/setAuthToken';
import {getData, storeData} from '../../utils/Storage';
import {
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  AUTH_ERROR,
  Action,
  AuthStateInterface,
  FormDataInterface,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  SET_LOADING,
  LOGOUT,
  CONFIRM_COOKIE,
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
      // console.log(response.headers);

      accessToken = response.data.token;
      setAuthToken(accessToken);
      await storeData('credentials', JSON.stringify(formData));
      dispatch({
        type: LOGIN_SUCCESS,
        payload: response.data.token,
      });

      return true;
    } catch (error) {
      console.log(error.response.data.message);
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
      // // console.log(response.headers);

      accessToken = response.data.token;
      setAuthToken(accessToken);
      dispatch({
        type: REGISTER_SUCCESS,
        payload: response.data.token,
      });

      //loadUser();
    } catch (error) {
      let {message} = error.response.data;
      // console.log({ message });
      if (message !== 'User already exists') {
        message = 'Something went wrong!';
      }
      dispatch({
        type: REGISTER_FAIL,
        payload: message,
      });
    }
  }

  async function refreshToken(): Promise<void> {
    try {
      const response = await axios.get(
        'http://192.168.25.230:3000/auth/refresh_token',
      );
      // console.log(response.data);
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

  // async function loadUser() {
  //   try {
  //     const response = await axios.get('http://192.168.25.230:3000/auth/user');
  //     dispatch({
  //       type: USER_LOADED,
  //       payload: response.data,
  //     });
  //   } catch (error) {
  //     dispatch({
  //       type: AUTH_ERROR,
  //       payload: error.response.data.message,
  //     });
  //   }
  // }

  async function loadUser() {
    try {
      const credentials = await getData('credentials');
      if (credentials) {
        const {email, password} = JSON.parse(credentials);
        const success = await login({email, password});
        return success;
      }
      return false;
    } catch (error) {
      return false;
    }
  }

  function clearErrors() {}

  function setLoading(loading: boolean) {
    dispatch({
      type: SET_LOADING,
      payload: loading,
    });
  }

  async function logout() {
    try {
      await axios.get('http://192.168.25.230:3000/auth/logout');
      dispatch({
        type: LOGOUT,
        payload: null,
      });
    } catch (error) {
      dispatch({
        type: AUTH_ERROR,
        payload: 'Something went wrong',
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
        refreshToken,
      }}>
      {props.children}
    </AuthContext.Provider>
  );
}

export default AuthState;
