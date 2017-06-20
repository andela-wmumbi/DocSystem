import React from 'react';

const CreateDocument = () => (
  <div className="row">
    <form className="col s12">
      <div className="row">
        <div className="input-field col s6">
          <input placeholder="Placeholder" id="first_name" type="text" className="validate" />
          <label htmlFor="first_name">Title</label>
        </div>
      </div>
      <div className="row">
        <div className="input-field col s6">
          <textarea id="icon_prefix2" className="materialize-textarea" />
          <label htmlFor="icon_prefix2">Content</label>
        </div>
      </div>
      <div className="row">
        <select className="browser-default">
          <option value="" >Choose your option</option>
          <option value="1">Public</option>
          <option value="2">Private</option>
        </select>
      </div>
    </form>
  </div>
  );
export default CreateDocument;
