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
  ItemInterface
} from '../types';

import axios from 'axios';

function ItemState(props: any): any {
  const initialState: ItemStateInterface = {
    items: null,
    loading: true
  };

  const [state, dispatch] = useReducer(ItemReducer, initialState);
  async function getItems() {
    try {
      const response = await axios.get('http://localhost:3000/items');
      console.log('RESPOSTA', response.data);
      dispatch({
        type: GET_ITEMS,
        payload: { items: response.data }
      });
    } catch (error) {
      dispatch({
        type: ITEM_ERROR,
        payload: error.response.data.error
      });
    }
  }
  async function addItem() {}
  async function deleteItem(itemId: string) {
    try {
      await axios.delete(`http://localhost:3000/items/${itemId}`);
      dispatch({
        type: DELETE_ITEM,
        payload: { item: { id: itemId } }
      });
    } catch (error) {
      dispatch({
        type: ITEM_ERROR,
        payload: { error: error.response.data.error }
      });
    }
  }
  async function updateItem(item: ItemInterface) {
    try {
      await axios.patch(`http://localhost:3000/items/${item.id}`, item);
      dispatch({
        type: UPDATE_ITEM,
        payload: { item }
      });
    } catch (error) {
      dispatch({
        type: UPDATE_ERROR,
        payload: { error: error.response.data.error }
      });
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
        updateItem
      }}
    >
      {props.children}
    </ItemProvider>
  );
}

export default ItemState;
