/* eslint-disable no-fallthrough */
import {
  GET_ITEMS,
  ADD_ITEM,
  DELETE_ITEM,
  ItemStateInterface,
  ItemAction,
  UPDATE_ITEM,
  SET_LOADING,
  ITEM_ERROR,
} from '../types';
import {} from 'react';

function ItemReducer(
  state: ItemStateInterface,
  action: ItemAction,
): ItemStateInterface {
  const {items, item, error, loading} = action.payload;
  switch (action.type) {
    case GET_ITEMS:
      // console.log('GET ITEMS', items);
      return {
        items: items ? items : [],
        loading: false,
      };
    case ADD_ITEM:
      if (state.items) {
        if (item) {
          return {
            items: [item, ...state.items],
            loading,
          };
        }
      }
    case ITEM_ERROR:
      return {
        ...state,
        error: error,
      };
    case UPDATE_ITEM:
      if (state.items) {
        if (item) {
          return {
            items: state.items.map(elem => (elem.id === item.id ? item : elem)),
            loading: false,
          };
        }
      } else {
        return state;
      }

    case DELETE_ITEM:
      if (state.items) {
        if (item) {
          return {
            items: state.items.filter(elem => elem.id !== item.id),
            loading: false,
          };
        }
      }
    case SET_LOADING:
      return {
        ...state,
        loading: loading,
      };
    default:
      return state;
  }
}
// Reducer<ItemStateInterface, ItemAction>
export default ItemReducer;