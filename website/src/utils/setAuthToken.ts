import axios from 'axios';

function setAuthToken(token: string) {
  console.log('Setting token:', { token });
  if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete axios.defaults.headers.common['Authorization'];
  }
}

export default setAuthToken;
