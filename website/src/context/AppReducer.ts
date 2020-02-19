import {
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  AUTH_ERROR,
  USER_LOADED,
  REGISTER_FAIL,
  REGISTER_SUCCESS,
  SET_LOADING,
  LOGOUT,
  RESTORE_SESSION_ERROR,
  CLEAR_ERRORS,
  GET_ITEMS,
  ADD_ITEM,
  DELETE_ITEM,
  AppStateInterface,
  UPDATE_ITEM,
  ITEM_ERROR,
  ITEM_LOADING
} from './types';

const AppReducer: any = (
  // Reducer<iAuthState, Action>
  state: AppStateInterface,
  action: any
) => {
  console.log(action.type, 'payload:', action.payload);

  // items, item, error, loading;
  const payload = action.payload;

  switch (action.type) {
    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        token: payload,
        loading: false
      };

    case USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        user: payload,
        loading: false
      };
    case REGISTER_FAIL:
    case LOGIN_FAIL:
    case AUTH_ERROR:
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
        user: null,
        error: payload
      };

    case RESTORE_SESSION_ERROR:
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
        error: null
      };
    case SET_LOADING:
      return {
        ...state,
        loading: payload
      };
    case ITEM_LOADING:
      return {
        ...state,
        item_loading: payload
      };
    case LOGOUT: {
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        loading: false
      };
    }
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null
      };
    case GET_ITEMS:
      return {
        ...state,
        items: payload.items ? payload.items : [],
        item_loading: false
      };
    case ADD_ITEM:
      if (state.items) {
        return {
          ...state,
          items: [payload.item, ...state.items],
          loading: payload.loading
        };
      } else {
        return state;
      }
    case ITEM_ERROR:
      return {
        ...state,
        error: payload.error
      };
    case UPDATE_ITEM:
      if (state.items && payload.item) {
        return {
          ...state,
          items: state.items.map(elem =>
            elem.id === payload.item.id ? payload.item : elem
          ),
          loading: false
        };
      } else {
        return state;
      }

    case DELETE_ITEM:
      if (state.items && payload.item) {
        return {
          ...state,
          items: state.items.filter(elem => elem.id !== payload.item.id),
          loading: false
        };
      } else {
        return state;
      }
    default:
      return state;
  }
};

export default AppReducer;
