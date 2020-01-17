import { User } from '../types';

export const GET_ITEMS = 'GET_ITEMS';
export const ADD_ITEM = 'ADD_ITEM';
export const DELETE_ITEM = 'DELETE_ITEM';

export const UPDATE_ITEM = 'UPDATE_ITEM';
// export const FILTER_CONTACTS = 'FILTER_CONTACT';
//export const CLEAR_CONTACTS = 'CLEAR_CONTACTS';
export const ITEM_ERROR = 'ITEM_ERROR';
export const UPDATE_ERROR = 'UPDATE_ERROR';
//export const CLEAR_FILTER = 'CLEAR_FILTER';
export const SET_ALERT = 'SET_ALERT';
export const REMOVE_ALERT = 'REMOVE_ALERT';
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const REGISTER_FAIL = 'REGISTER_FAIL';
export const USER_LOADED = 'USER_LOADED';
export const AUTH_ERROR = 'AUTH_ERROR';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAIL = 'LOGIN_FAIL';
export const LOGOUT = 'LOGOUT';
export const CLEAR_ERRORS = 'CLEAR_ERRORS';

export interface iFormData {
  name?: string;
  email: string;
  password: string;
}

export interface iAuthContext {
  // token: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  user: User | null;
  error: {};
  login: (formData: iFormData) => void;
  register?: (formData: iFormData) => void;
  logout?: () => void;
  clearErrors: () => void;
  loadUser: () => void;
}

export interface iAuthState {
  token?: string;
  isAuthenticated: boolean;
  loading: boolean;
  user: User | null;
  error: {};
}

// export interface AuthPayload {
//   token: string;
// }

export interface ItemInterface {
  id: string;
  body: string;
  title: string;
}

export interface ItemStateInterface {
  items: Array<ItemInterface> | null;
  error?: string;
  loading: boolean;
}

export interface ItemsContextInterface {
  items: Array<ItemInterface> | null;
  error?: string;
  loading: boolean;
  getItems: () => void;
  addItem: (item: ItemInterface) => void;
  deleteItem: (itemId: string) => void;
  updateItem: (item: ItemInterface) => void;
}
export interface ItemAction {
  type: string;
  //payload: Array<ItemInterface> | [ItemInterface] | string;
  payload: {
    items?: Array<ItemInterface>;
    item?: ItemInterface;
    error?: string;
  };
}

export interface Action {
  type: string;
  payload: User | string | null;
}
