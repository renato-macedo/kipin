import {
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  AUTH_ERROR,
  Action,
  AuthStateInterface,
  USER_LOADED,
  REGISTER_FAIL,
  REGISTER_SUCCESS,
  SET_LOADING,
  LOGOUT,
  CONFIRM_COOKIE,
} from '../types';

const AuthReducer: any = (
  // Reducer<iAuthState, Action>
  state: AuthStateInterface,
  action: Action,
) => {
  switch (action.type) {
    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS:
      //localStorage.setItem('token', action.payload.token);
      // console.log('LOGIN SUCCESS');
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        token: action.payload,
      };

    case USER_LOADED:
      // console.log('USER LOADED');
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload,
        loading: false,
      };
    case REGISTER_FAIL:
    case LOGIN_FAIL:
    case AUTH_ERROR:
      console.log('teste');
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
        user: null,
        error: action.payload,
      };

    case CONFIRM_COOKIE:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
      };
    case SET_LOADING:
      return {
        ...state,
        loading: action.payload,
      };
    case LOGOUT: {
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        loading: false,
        error: null,
      };
    }
    default:
      return state;
  }
};

export default AuthReducer;
