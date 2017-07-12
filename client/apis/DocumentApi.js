import request from 'superagent';
import axios from 'axios';

export function documentCreate(document) {
  return request
    .post('/api/documents')
    .set('x-access-token', sessionStorage.token)
    .send(document);
}
export function getDocumentUpdate(document) {
  return request
    .put(`/api/documents/${document.id}`)
    .set('x-access-token', sessionStorage.token)
    .send(document);
}
export function getAllDocuments() {
  return request
    .get('/api/documents');
}

export function getDocumentDelete(id) {
  return request
    .delete(`/api/documents/${id}`)
    .set('x-access-token', sessionStorage.token);
}
export function getUserDocs(id) {
  return axios({
    method: 'GET',
    headers: {
      'x-access-token': sessionStorage.token
    },
    url: `/users/${id}/documents`
  });
}
export function getADocument(title) {
  return request
    .get(`/search/documents/${title}`)
    .set('x-access-token', sessionStorage.token);
}
export function getPagination(limit, offset) {
  return request
    .get(`/api/documents?limit=${limit}&offset=${offset}`)
    .set('x-access-token', sessionStorage.token);
}
export function getRoleDocuments(role) {
  return request
    .get(`/api/roleDocuments/${role}`);
}
