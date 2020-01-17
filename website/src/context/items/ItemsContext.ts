import { createContext } from 'react';
import { ItemInterface, ItemsContextInterface } from '../types';

const ItemsContext = createContext<ItemsContextInterface>({
  loading: true,
  items: null,
  getItems: () => {},
  addItem: () => {},
  deleteItem: () => {},
  updateItem: () => {}
});

export default ItemsContext;
