import axios from 'axios';
import request from 'superagent';

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
export function getAllUsers() {
  return request
    .get('/api/users')
    .set('x-access-token', sessionStorage.token);
}
export function getAUser(name) {
  return request
    .get(`/search/users/${name}`)
    .set('x-access-token', sessionStorage.token);
}
