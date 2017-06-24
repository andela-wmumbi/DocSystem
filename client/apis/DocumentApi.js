import request from 'superagent';

export function documentCreate(document) {
  return request
    .post('/api/documents')
    .set('x-access-token', sessionStorage.token)
    .send(document);
}

export function getAllDocuments() {
  return request
    .get('/api/documents');
}
export function getDocumentUpdate(id, data) {
  return request
    .put('/api/documents/:docId')
    .send(data);
}
export function getDocumentDelete(id, token) {
  return request
    .delete(`/api/documents/${id}`)
    .set('x-access-token', sessionStorage.token);
}
