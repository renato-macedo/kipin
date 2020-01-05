import axios, { AxiosInstance } from 'axios';

const instanceItems = axios.create({
  baseURL: '/items'
});

const instanceAuth = axios.create({
  baseURL: '/auth'
});

function ItemsService(token: string): AxiosInstance {
  instanceItems.defaults.headers.common['Authorization'] = token;
  return instanceItems;
}

function AuthService(): AxiosInstance {
  return instanceAuth;
}

export default {
  AuthService,
  ItemsService
};
