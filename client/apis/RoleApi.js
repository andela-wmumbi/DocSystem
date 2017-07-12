import request from 'superagent';

export function roleCreate(role) {
  return request
    .post('/api/roles')
    .set('x-access-token', sessionStorage.token)
    .send(role);
}
export function getAllRoles() {
  return request
    .get('/api/roles');
}
