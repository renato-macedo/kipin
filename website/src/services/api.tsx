import axios, { AxiosInstance } from 'axios';

const instanceItems = axios.create({
  baseURL: 'http://localhost:3000'
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
