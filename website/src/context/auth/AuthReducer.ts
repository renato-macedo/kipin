import {
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  AUTH_ERROR,
  Action,
  iAuthState
} from '../types';

import { Reducer } from 'react';

const AuthReducer: any = (
  // Reducer<iAuthState, Action>
  state: iAuthState,
  action: Action
) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      if (action.payload.token) {
        localStorage.setItem('token', action.payload.token);
        return {
          ...state,
          user: action.payload,
          isAuthtenticated: true,
          loading: false
        };
      } else {
        throw new Error(`Token cannot be null, payload: ${action.payload}`);
      }
    case LOGIN_FAIL:
    case AUTH_ERROR:
      localStorage.removeItem('token');
      return {
        ...state,
        token: null,
        isAuthtenticated: false,
        loading: false,
        user: null,
        error: action.payload
      };
    default:
      return {
        ...state
      };
  }
};

export default AuthReducer;
