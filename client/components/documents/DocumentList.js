import React, { PropTypes } from 'react';

const DocumentList = ({ documents }) => (
  <ul>
    {documents.map(document =>
      <li> {document.title}</li>
      )}
  </ul>
  );
DocumentList.propTypes = {
  documents: PropTypes.array.isRequired
};
export default DocumentList;
