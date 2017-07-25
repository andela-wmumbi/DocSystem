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
    .get('/api/users');
}
export function getAUser(name) {
  return request
    .get(`/search/users/${name}`)
    .set('x-access-token', sessionStorage.getItem('token'));
}
export function getUserDelete(id) {
  return request
    .delete(`/api/users/${id}`)
    .set('x-access-token', sessionStorage.getItem('token'));
}
export function getUserUpdate(user) {
  return request
    .put(`/api/users/${user.id}`)
    .set('x-access-token', sessionStorage.getItem('token'))
    .send(user);
}
export function getUsersPagination(limit, offset) {
  return request
    .get(`/api/users?limit=${limit}&offset=${offset}`)
    .set('x-access-token', sessionStorage.getItem('token'));
}
export function getUserDelete(id) {
  return request
    .delete(`/api/users/${id}`)
    .set('x-access-token', sessionStorage.token);
}
