import { createContext } from 'react';
import { AuthContext } from '../types';

const AuthContext = createContext<AuthContext>({
  isAuthenticated: false,
  loading: false,
  loadUser: () => {},
  login: () => {},
  register: () => {},
  logout: () => {},
  token: '',
  user: null,
  error: {},
  clearErrors: () => {}
});

export default AuthContext;
