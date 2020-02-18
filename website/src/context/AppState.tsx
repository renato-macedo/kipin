import React, { useReducer, Reducer } from 'react';
import AppContext from './AppContext';
import AppReducer from './AppReducer';

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
  USER_LOADED,
  CONFIRM_COOKIE
} from './types';

import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';

let accessToken: string;

function AppState(props: any): any {
  const initialState: AppStateInterface = {
    token: '',
    isAuthenticated: false,
    loading: true,
    user: null,
    error: null,
    items: null,
    item_loading: true
  };

  const [state, dispatch] = useReducer<Reducer<AppStateInterface, Action>>(
    AppReducer,
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

  function clearErrors() {
    dispatch({
      type: CLEAR_ERRORS,
      payload: null
    });
  }

  async function getItems() {
    try {
      const response = await axios.get('http://localhost:3000/items');
      // console.log('RESPOSTA', response.data);
      dispatch({
        type: GET_ITEMS,
        payload: { items: response.data, item_loading: false }
      });
    } catch (error) {
      const sucess = await renewToken();
      if (sucess) {
        getItems();
      } else {
        dispatch({
          type: AUTH_ERROR,
          payload: error.response.data.error
        });
      }
    }
  }

  async function addItem(body: string) {
    const data = { body, title: 'title' };
    try {
      const response = await axios.post('http://localhost:3000/items', data);
      dispatch({
        type: ADD_ITEM,
        payload: { item: response.data, item_loading: false }
      });
    } catch (error) {
      const sucess = await renewToken();
      if (sucess) {
        addItem(body);
      } else {
        dispatch({
          type: AUTH_ERROR,
          payload: error.response.data.message
        });
      }
    }
  }

  async function deleteItem(itemId: string) {
    try {
      await axios.delete(`http://localhost:3000/items/${itemId}`);
      dispatch({
        type: DELETE_ITEM,
        payload: {
          item: { id: itemId, body: '', title: '' },
          item_loading: false
        }
      });
    } catch (error) {
      const sucess = await renewToken();
      if (sucess) {
        deleteItem(itemId);
      } else {
        dispatch({
          type: AUTH_ERROR,
          payload: { error: error.response.data.error, item_loading: false }
        });
      }
    }
  }

  async function updateItem(item: ItemInterface) {
    try {
      await axios.patch(`http://localhost:3000/items/${item.id}`, item);
      dispatch({
        type: UPDATE_ITEM,
        payload: { item, item_loading: false }
      });
    } catch (error) {
      const sucess = await renewToken();
      if (sucess) {
        updateItem(item);
      } else {
        dispatch({
          type: UPDATE_ERROR,
          payload: { error: error.response.data.error, item_loading: false }
        });
      }
    }
  }

  function setLoading(loading: boolean) {
    dispatch({
      type: SET_LOADING,
      payload: { item_loading: loading }
    });
  }

  async function renewToken() {
    try {
      const { data } = await axios.get(
        'http://localhost:3000/auth/refresh_token'
      );
      console.log({ data });
      setAuthToken(data.token);
      return true;
    } catch (error) {
      return false;
    }
  }

  async function logout() {
    try {
      await axios.get('http://localhost:3000/auth/logout');
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
        refreshToken,
        item_loading: state.item_loading
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
}

function tellExtensionItsAuthenticated(data: any) {
  const LoginEvent = new CustomEvent('login', { detail: { data } });
  document.dispatchEvent(LoginEvent);
  console.log('dispatch login event');
}

export default AppState;
