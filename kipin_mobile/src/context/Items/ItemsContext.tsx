import {createContext} from 'react';
import {ItemsContextInterface} from '../types';

const ItemsContext = createContext<ItemsContextInterface>({
  loading: true,
  items: null,
  getItems: async () => {},
  addItem: () => {},
  deleteItem: () => {},
  updateItem: () => {},
  setLoading: () => {},
});

export default ItemsContext;
