import { createContext } from 'react';
import { iAuthContext } from '../types';

const AuthContext = createContext<iAuthContext>({
  isAuthenticated: false,
  loading: false,
  loadUser: () => {},
  login: () => {},
  register: () => {},
  logout: () => {},
  // token: '',
  user: null,
  error: {},
  clearErrors: () => {}
});

export default AuthContext;
