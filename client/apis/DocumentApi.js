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
export function createDocument() {

}
