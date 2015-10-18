// Action types

export const types = {

  // Sync

  ADD_ITEM: 'ADD_ITEM',
  REMOVE_ITEM: 'REMOVE_ITEM',
  EDIT_ITEM: 'EDIT_ITEM',

  // Async

  REQUEST_ITEM: 'REQUEST_ITEM',
  RECEIVE_ITEM: 'RECEIVE_ITEM',

};


// Private action creators

function requestItem(text) {
  return {
    type: types.REQUEST_ITEM,
    text
  };
}

function receiveItem(text) {
  return {
    type: types.RECEIVE_ITEM,
    text: `Async ${text}`
  };
}

// Public action creators

export const creators = {

  addItem(text) {
    return {
      type: types.ADD_ITEM,
      text
    };
  },

  removeItem(id) {
    return {
      type: types.REMOVE_ITEM,
      id
    };
  },

  editItem(id, text) {
    return {
      type: types.EDIT_ITEM,
      id,
      text
    };
  },

  // Async

  fetchItem(text) {
    return (dispatch) => {
      dispatch(requestItem(text));
      setTimeout(() => dispatch(receiveItem(text)), 2000);
    }
  },

};


// Export all by default

export default { types, creators };
