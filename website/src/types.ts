import { ItemInterface } from './context/types';

export interface ItemProps {
  key: any;
  body: string;
  title: string;
}

export interface ItemListProps {
  items: Array<ItemInterface>;
}

export interface User {
  name: string;
  email: string;
  token?: string;
}
