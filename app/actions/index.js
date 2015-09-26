import types from './types';


// Add your actions

export function increment() {
  return {
    type: types.INCREMENT
  };
};

export function addItem({id, text}) {
  return {
    type: types.ADD_ITEM,
    id,
    text
  }
};


// Export all by default

export default {
  addItem,
  increment
};