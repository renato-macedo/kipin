import { User } from 'types';

export const GET_CONTACTS = 'GET_CONTACTS';
export const ADD_CONTACT = 'ADD_CONTACT';
export const DELETE_CONTACT = 'DELETE_CONTACT';
export const SET_CURRENT = 'SET_CURRENT';
export const CLEAR_CURRENT = 'CLEAR_CURRENT';
export const UPDATE_CONTACT = 'UPDATE_CONTACT';
export const FILTER_CONTACTS = 'FILTER_CONTACT';
export const CLEAR_CONTACTS = 'CLEAR_CONTACTS';
export const CONTACT_ERROR = 'CONTACT_ERROR';
export const UPDATE_ERROR = 'UPDATE_ERROR';
export const CLEAR_FILTER = 'CLEAR_FILTER';
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
  //token: string | null;
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
  isAuthenticated: boolean;
  loading: boolean;
  user: User | null;
  error: {};
}

// export interface AuthPayload {
//   token: string;
// }

export interface Action {
  type: string;
  payload: User | null;
}
