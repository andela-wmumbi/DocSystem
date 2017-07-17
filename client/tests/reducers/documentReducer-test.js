import expect from 'expect';
import documentReducer from './../../reducers/documentReducer';
import * as types from './../../actions/actionTypes';

describe('document reducer', () => {
  it('should return initial state', () => {
    expect(documentReducer(undefined, {})).toEqual([]);
  });
  it('should handle create document', () => {
    const initialState = {
      documents: []
    };
    const document = { id: 1 };
    const action = { type: types.CREATE_DOCUMENT_SUCCESS, document };

    const newState = documentReducer(initialState, action);

    expect(newState[0]).toEqual(document);
  });
});

