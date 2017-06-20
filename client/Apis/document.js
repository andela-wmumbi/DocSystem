class DocumentApi {
  static getAllDocuments() {
    return fetch('http://localhost:3000/api/documents')
      .then((response) => {
        return response.json();
      })
      .catch((error) => {
        return error;
      });
  }
}
export default DocumentApi;
