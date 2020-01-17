import {
  GET_ITEMS,
  ADD_ITEM,
  UPDATE_ERROR,
  DELETE_ITEM,
  ItemStateInterface,
  ItemAction,
  UPDATE_ITEM
} from '../types';
import { Reducer } from 'react';

function ItemReducer(
  state: ItemStateInterface,
  action: ItemAction
): ItemStateInterface {
  const { items, item, error } = action.payload;
  switch (action.type) {
    case GET_ITEMS:
      console.log('GET ITEMS', items);
      return {
        items: action.payload.items ? action.payload.items : [],
        loading: false
      };
    case ADD_ITEM:
      if (state.items) {
        if (item) {
          return {
            items: [...state.items, item],
            loading: false
          };
        }
      }

    case UPDATE_ITEM:
      if (state.items) {
        if (item) {
          return {
            items: state.items.map(elem => (elem.id === item.id ? item : elem)),
            loading: false
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
            loading: false
          };
        }
      }

    default:
      return state;
  }
}
// Reducer<ItemStateInterface, ItemAction>
export default ItemReducer;
