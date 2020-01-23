import { createContext } from 'react';
import { AuthContextInterface } from '../types';

const AuthContext = createContext<AuthContextInterface>({
  isAuthenticated: false,
  loading: false,
  loadUser: () => {},
  login: () => {},
  register: () => {},
  logout: () => {},
  // token: '',
  user: null,
  error: null,
  clearErrors: () => {},
  setLoading: () => {}
});

export default AuthContext;
