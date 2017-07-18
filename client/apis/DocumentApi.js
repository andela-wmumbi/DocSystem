import request from 'superagent';

export function documentCreate(document) {
  return request
    .post('/api/documents')
    .set('x-access-token', sessionStorage.getItem('token'))
    .send(document);
}
export function getDocumentUpdate(document) {
  return request
    .put(`/api/documents/${document.id}`)
    .set('x-access-token', sessionStorage.getItem('token'))
    .send(document);
}
export function getAllDocuments() {
  return request
    .get('/api/documents')
    .set('x-access-token', sessionStorage.getItem('token'));
}

export function getDocumentDelete(id) {
  return request
    .delete(`/api/documents/${id}`)
    .set('x-access-token', sessionStorage.getItem('token'));
}
export function getUserDocs(id) {
  return request
    .get(`/users/${id}/documents`)
    .set('x-access-token', sessionStorage.getItem('token'));
}
export function getADocument(title) {
  return request
    .get(`/search/documents?q=${title}`)
    .set('x-access-token', sessionStorage.getItem('token'));
}
export function getPagination(limit, offset) {
  return request
    .get(`/api/documents?limit=${limit}&offset=${offset}`)
    .set('x-access-token', sessionStorage.getItem('token'));
}
export function getRoleDocuments(role) {
  return request
    .get(`/api/roleDocuments?role=${role}`);
}
