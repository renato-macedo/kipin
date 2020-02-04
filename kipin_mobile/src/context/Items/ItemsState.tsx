import React, {useReducer} from 'react';

import ItemContext from './ItemsContext';
const ItemProvider = ItemContext.Provider;
import ItemReducer from './ItemsReducer';

import {
  GET_ITEMS,
  ADD_ITEM,
  UPDATE_ERROR,
  DELETE_ITEM,
  ItemStateInterface,
  UPDATE_ITEM,
  ITEM_ERROR,
  ItemInterface,
  SET_LOADING,
} from '../types';

import axios from 'axios';

function ItemState(props: any): any {
  const initialState: ItemStateInterface = {
    items: null,
    loading: true,
  };

  const [state, dispatch] = useReducer(ItemReducer, initialState);

  async function getItems() {
    console.log('aaaaa');
    try {
      const response = await axios.get('http://192.168.25.230:3000/items');
      // console.log('RESPOSTA', response.data);
      dispatch({
        type: GET_ITEMS,
        payload: {items: response.data, loading: false},
      });
    } catch (error) {
      console.log('aaaaaaaaaaaaaaaaaaaaaa', error.response);
      dispatch({
        type: ITEM_ERROR,
        payload: {error: error.response.data.error, loading: false},
      });
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
        payload: {item: response.data, loading: false},
      });
    } catch (error) {}
  }

  async function deleteItem(itemId: string) {
    try {
      await axios.delete(`http://192.168.25.230:3000/items/${itemId}`);
      dispatch({
        type: DELETE_ITEM,
        payload: {item: {id: itemId, body: '', title: ''}, loading: false},
      });
    } catch (error) {
      dispatch({
        type: ITEM_ERROR,
        payload: {error: error.response.data.error, loading: false},
      });
    }
  }

  async function updateItem(item: ItemInterface) {
    try {
      await axios.patch(`http://192.168.25.230:3000/items/${item.id}`, item);
      dispatch({
        type: UPDATE_ITEM,
        payload: {item, loading: false},
      });
    } catch (error) {
      dispatch({
        type: UPDATE_ERROR,
        payload: {error: error.response.data.error, loading: false},
      });
    }
  }

  function setLoading(loading: boolean) {
    dispatch({
      type: SET_LOADING,
      payload: {loading},
    });
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
        setLoading,
      }}>
      {props.children}
    </ItemProvider>
  );
}

export default ItemState;
