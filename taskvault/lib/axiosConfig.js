
import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://reqres.in/api/', // URL reqresi API
  headers: {
    'Content-Type': 'application/json',
  },
});

export default instance;
