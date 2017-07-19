import request from 'superagent';

export function roleCreate(title) {
  return request
    .post('/api/roles')
    .send(title);
}
export function getAllRoles() {
  return request
    .get('/api/roles');
}
export function getRoleDelete(id) {
  return request
    .delete(`/api/roles/${id}`)
    .set('x-access-token', sessionStorage.token);
}
