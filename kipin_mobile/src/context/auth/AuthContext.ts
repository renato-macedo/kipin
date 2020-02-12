import {createContext} from 'react';
import {AuthContextInterface} from '../types';

const AuthContext = createContext<AuthContextInterface>({
  isAuthenticated: false,
  loading: false,
  loadUser: () => {},
  login: () => {},
  register: () => {},
  logout: () => {},
  token: null,
  user: null,
  error: null,
  clearErrors: () => {},
  setLoading: () => {},
  refreshToken: async () => [false, 'no token'],
});

export default AuthContext;
