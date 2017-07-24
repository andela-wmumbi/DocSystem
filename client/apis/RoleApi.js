import request from 'superagent';

export function roleCreate(title) {
  return request
    .post('/api/roles')
    .set('x-access-token', sessionStorage.getItem('token'))
    .send(title);
}
export function getAllRoles() {
  return request
    .get('/api/roles')
    .set('x-access-token', sessionStorage.getItem('token'));
}
export function getRoleDelete(id) {
  return request
    .delete(`/api/roles/${id}`)
    .set('x-access-token', sessionStorage.token);
}
