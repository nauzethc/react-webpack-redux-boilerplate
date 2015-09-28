import types from './types';


// Add your actions

// Action creators, they return plain objects

export function addItem(text) {
  return {
    type: types.ADD_ITEM,
    text
  }
};

export function removeItem(id) {
  return {
    type: types.REMOVE_ITEM,
    id
  }
}

export function editItem(id, text) {
  return {
    type: types.EDIT_ITEM,
    id,
    text
  }
}

export function requestItem(text) {
  return {
    type: types.REQUEST_ITEM,
    text
  }
}

export function receiveItem(text) {
  return {
    type: types.RECEIVE_ITEM,
    text: `Async ${text}`
  }
}


// Async actions
// They are responsible of dispatch sync actions instead of
// working as an action creator

export function fetchItem(text) {
  return function(dispatch) {
    dispatch(requestItem(text));
    setTimeout(() => dispatch(receiveItem(text)), 2000);
  }
}


// Export all by default

export default {
  addItem,
  removeItem,
  editItem,
  fetchItem
};