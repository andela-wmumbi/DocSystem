import request from 'superagent';
import axios from 'axios';
import UserDetails from './../actions/UserDetails';

export function documentCreate(document) {
  const userId = localStorage.getItem('userId');
  return request
    .post('/api/documents')
    .send(Object.assign({}, document, { id: userId }))
    .set('Accept', 'application/json');
}

export function getAllDocuments() {
  return request
    .get('/api/documents');
}
export function createDocument() {

}
