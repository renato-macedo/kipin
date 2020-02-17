import axios from 'axios';

export function setAuthToken(token: string) {
  if (token) {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  } else {
    delete axios.defaults.headers.common.Authorization;
  }
}

export function getAuthToken(): string {
  return axios.defaults.headers.common.Authorization;
}
