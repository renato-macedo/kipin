import {createContext} from 'react';
import {ItemsContextInterface} from '../types';

const ItemsContext = createContext<ItemsContextInterface>({
  loading: true,
  items: null,
  getItems: () => {},
  addItem: () => {},
  deleteItem: () => {},
  updateItem: () => {},
  setLoading: () => {},
});

export default ItemsContext;
