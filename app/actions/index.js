import types from './types';


// Add your actions

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


// Export all by default

export default {
  addItem,
  removeItem,
  editItem
};