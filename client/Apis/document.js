class Document {
  static getAllDocuments() {
    return fetch('/Users/winnie/Documents/DocSystem/client/example.json').then(response => {
      console.log(response)
      return response.json();
    }).catch(error => {
      return error;
    });
  }
  export default Document;
