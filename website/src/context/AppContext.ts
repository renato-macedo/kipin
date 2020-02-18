import { createContext } from 'react';
import { FormDataInterface, AppContextInterface } from './types';

//import {AuthContextInterface} from './types';

const AppContext = createContext<AppContextInterface>({
  isAuthenticated: false,
  loading: false,
  loadUser: () => {},
  login: async (_formData: FormDataInterface) => {},
  register: async (_formData: FormDataInterface) => {},
  logout: () => {},
  user: null,
  error: null,
  clearErrors: () => {},
  items: null,
  item_loading: false,
  getItems: async () => {},
  addItem: () => {},
  deleteItem: () => {},
  refreshToken: async () => {},
  updateItem: () => {},
  setLoading: (_loading: boolean) => {}
});

export default AppContext;
