import React, {useReducer, Reducer} from 'react';
import AppContext from './AppContext';
import AppReducer from './AppReducer';
import {setAuthToken} from '../utils/AuthToken';
import {getData, storeData, removeItem} from '../utils/Storage';

import {
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  Action,
  AppStateInterface,
  FormDataInterface,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  SET_LOADING,
  LOGOUT,
  RESTORE_SESSION_ERROR,
  DELETE_ITEM,
  ADD_ITEM,
  GET_ITEMS,
  CLEAR_ERRORS,
  UPDATE_ERROR,
  UPDATE_ITEM,
  ItemInterface,
  AUTH_ERROR,
} from './types';

import axios from 'axios';

let accessToken: string;

function AppState(props: any): any {
  const initialState: AppStateInterface = {
    token: '',
    isAuthenticated: false,
    loading: true,
    user: null,
    error: null,
    items: null,
    item_loading: true,
  };

  const [state, dispatch] = useReducer<Reducer<AppStateInterface, Action>>(
    AppReducer,
    initialState,
  );

  // Login User
  async function login(formData: FormDataInterface) {
    try {
      const response = await axios.post(
        'http://192.168.25.230:3000/auth/login/mobile',
        formData,
      );
      const {refresh_token, token} = response.data;

      accessToken = token;
      setAuthToken(accessToken);

      await Promise.all([
        storeData('credentials', JSON.stringify(formData)),
        storeData('refreshToken', refresh_token),
      ]);

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
    await Promise.all([removeItem('credentials'), removeItem('refreshToken')]);
    dispatch({
      type: LOGOUT,
      payload: null,
    });
  }

  async function getItems() {
    try {
      const response = await axios.get('http://192.168.25.230:3000/items');

      dispatch({
        type: GET_ITEMS,
        payload: {items: response.data, item_loading: false},
      });
    } catch (error) {
      const sucess = await renewToken();

      // console.log(sucess);

      if (sucess) {
        getItems();
      } else {
        dispatch({
          type: AUTH_ERROR,
          payload: error.response.data.error,
        });
      }
    }
  }

  async function addItem(body: string) {
    const data = {body, title: 'title'};
    try {
      const response = await axios.post(
        'http://192.168.25.230:3000/items',
        data,
      );
      dispatch({
        type: ADD_ITEM,
        payload: {item: response.data, item_loading: false},
      });
    } catch (error) {}
  }

  async function deleteItem(itemId: string) {
    try {
      await axios.delete(`http://192.168.25.230:3000/items/${itemId}`);
      dispatch({
        type: DELETE_ITEM,
        payload: {item: {id: itemId, body: '', title: ''}, item_loading: false},
      });
    } catch (error) {
      const sucess = await renewToken();
      if (sucess) {
        deleteItem(itemId);
      } else {
        dispatch({
          type: AUTH_ERROR,
          payload: {error: error.response.data.message, item_loading: false},
        });
      }
    }
  }

  async function updateItem(item: ItemInterface) {
    try {
      await axios.patch(`http://192.168.25.230:3000/items/${item.id}`, item);
      dispatch({
        type: UPDATE_ITEM,
        payload: {item, item_loading: false},
      });
    } catch (error) {
      dispatch({
        type: UPDATE_ERROR,
        payload: {error: error.response.data.error, item_loading: false},
      });
    }
  }

  async function renewToken() {
    // const [credentials, refresh_token] = await Promise.all([
    //   getData('credentials'),
    //   getData('refreshToken'),
    // ]);

    const refresh_token = await getData('refreshToken');

    if (refresh_token) {
      try {
        const response = await axios.post(
          'http://192.168.25.230:3000/auth/refresh_token/mobile',
          {
            refresh_token,
          },
        );

        setAuthToken(response.data.token);
        return true;
      } catch (error) {
        console.log({error: error.response.data});
        return false;
      }
    }
    return false;
  }
  return (
    <AppContext.Provider
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
        addItem,
        deleteItem,
        getItems,
        items: state.items,
        updateItem,
        item_loading: state.item_loading,
      }}>
      {props.children}
    </AppContext.Provider>
  );
}

export default AppState;
