import axios from 'axios';

export function register(user) {
  return axios({
    method: 'POST',
    data: user,
    url: '/api/users',
    headers: {
      'Content-Type': 'application/json'
    },
  });
}
export function login(credentials) {
  return axios({
    method: 'POST',
    data: credentials,
    url: '/api/signin',
    headers: {
      'Content-Type': 'application/json'
    },
  });
}
