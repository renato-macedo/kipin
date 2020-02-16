export const GET_ITEMS = 'GET_ITEMS';
export const ADD_ITEM = 'ADD_ITEM';
export const DELETE_ITEM = 'DELETE_ITEM';

export const UPDATE_ITEM = 'UPDATE_ITEM';
export const ITEM_ERROR = 'ITEM_ERROR';
export const UPDATE_ERROR = 'UPDATE_ERROR';

export const SET_ALERT = 'SET_ALERT';
export const REMOVE_ALERT = 'REMOVE_ALERT';
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const REGISTER_FAIL = 'REGISTER_FAIL';
export const USER_LOADED = 'USER_LOADED';
export const AUTH_ERROR = 'AUTH_ERROR';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const CONFIRM_COOKIE = 'CONFIRM_COOKIE';
export const LOGIN_FAIL = 'LOGIN_FAIL';
export const LOGOUT = 'LOGOUT';
export const CLEAR_ERRORS = 'CLEAR_ERRORS';
export const SET_LOADING = 'SET_LOADING';
export const RESTORE_SESSION_ERROR = 'RESTORE_SESSION_ERROR';

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

export interface FormDataInterface {
  name?: string;
  email: string;
  password: string;
}

export interface AuthContextInterface {
  token: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  user: User | null;
  error: string | null;
  login: (formData: FormDataInterface) => Promise<boolean>;
  register: (formData: FormDataInterface) => Promise<boolean>;
  logout: () => void;
  clearErrors: () => void;
  loadUser: () => void;
  setLoading: (loading: boolean) => void;
  refreshToken: () => void;
}

export interface AuthStateInterface {
  token?: string;
  isAuthenticated: boolean;
  loading: boolean;
  user: User | null;
  error: string | null;
}

// export interface AuthPayload {
//   token: string;
// }

export interface ItemInterface {
  id: string;
  body: string;
  title: string;
  image?: string;
  description?: string;
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
  getItems: () => Promise<void>;
  addItem: (body: string) => void;
  deleteItem: (itemId: string) => void;
  updateItem: (item: ItemInterface) => void;
  setLoading: (loading: boolean) => void;
}
export interface ItemAction {
  type: string;
  //payload: Array<ItemInterface> | [ItemInterface] | string;
  payload: {
    items?: Array<ItemInterface>;
    item?: ItemInterface;
    error?: string;
    loading: boolean;
  };
}

export interface Action {
  type: string;
  payload: User | string | boolean | null;
}
