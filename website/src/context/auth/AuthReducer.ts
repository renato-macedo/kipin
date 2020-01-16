import {
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  AUTH_ERROR,
  Action,
  iAuthState,
  USER_LOADED
} from '../types';

import { Reducer } from 'react';

const AuthReducer: any = (
  // Reducer<iAuthState, Action>
  state: iAuthState,
  action: Action
) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      //localStorage.setItem('token', action.payload.token);
      console.log('LOGIN SUCCESS');
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        token: null
      };

    case USER_LOADED:
      console.log('USER LOADED')
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
        token: null
      };
    case LOGIN_FAIL:
    case AUTH_ERROR:
      console.error('AUTH ERROR')
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
        user: null,
        error: action.payload
      };
    default:
      return state;
  }
};

export default AuthReducer;
