import {createContext} from 'react';
import {FormDataInterface, AppContextInterface} from './types';

//import {AuthContextInterface} from './types';

const AppContext = createContext<AppContextInterface>({
  isAuthenticated: false,
  loading: false,
  loadUser: () => {},
  login: async (_formData: FormDataInterface) => false,
  register: async (_formData: FormDataInterface) => false,
  logout: () => {},
  user: null,
  error: null,
  clearErrors: () => {},
  items: null,
  item_loading: false,
  getItems: async () => {},
  addItem: () => {},
  deleteItem: () => {},
  updateItem: () => {},
  setLoading: (_loading: boolean) => {},
});

export default AppContext;
