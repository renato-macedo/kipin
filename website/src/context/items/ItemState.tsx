import React, { useReducer, Reducer } from 'react';

import ItemContext from './ItemsContext';
const ItemProvider = ItemContext.Provider;
import ItemReducer from './ItemReducer';

import {
  GET_ITEMS,
  ADD_ITEM,
  UPDATE_ERROR,
  DELETE_ITEM,
  ItemStateInterface,
  ItemAction,
  UPDATE_ITEM,
  ITEM_ERROR,
  ItemInterface,
  SET_LOADING
} from '../types';

import axios from 'axios';
import setAuthToken from '../../utils/setAuthToken';

function ItemState(props: any): any {
  const initialState: ItemStateInterface = {
    items: null,
    loading: true
  };

  const [state, dispatch] = useReducer(ItemReducer, initialState);

  async function getItems() {
    try {
      const response = await axios.get('http://localhost:3000/items');
      // console.log('RESPOSTA', response.data);
      dispatch({
        type: GET_ITEMS,
        payload: { items: response.data, loading: false }
      });
    } catch (error) {
      const sucess = await renewToken();
      if (sucess) {
        getItems();
      } else {
        dispatch({
          type: ITEM_ERROR,
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
        payload: { item: response.data, loading: false }
      });
    } catch (error) {
      const sucess = await renewToken();
      if (sucess) {
        addItem(body);
      } else {
        dispatch({
          type: ITEM_ERROR,
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
        payload: { item: { id: itemId, body: '', title: '' }, loading: false }
      });
    } catch (error) {
      const sucess = await renewToken();
      if (sucess) {
        deleteItem(itemId);
      } else {
        dispatch({
          type: ITEM_ERROR,
          payload: { error: error.response.data.error, loading: false }
        });
      }
    }
  }

  async function updateItem(item: ItemInterface) {
    try {
      await axios.patch(`http://localhost:3000/items/${item.id}`, item);
      dispatch({
        type: UPDATE_ITEM,
        payload: { item, loading: false }
      });
    } catch (error) {
      const sucess = await renewToken();
      if (sucess) {
        updateItem(item);
      } else {
        dispatch({
          type: UPDATE_ERROR,
          payload: { error: error.response.data.error, loading: false }
        });
      }
    }
  }

  function setLoading(loading: boolean) {
    dispatch({
      type: SET_LOADING,
      payload: { loading }
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

  return (
    <ItemProvider
      value={{
        items: state.items,
        error: state.error,
        loading: state.loading,
        getItems,
        addItem,
        deleteItem,
        updateItem,
        setLoading
      }}
    >
      {props.children}
    </ItemProvider>
  );
}

export default ItemState;
