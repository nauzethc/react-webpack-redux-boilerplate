import types from '../actions/types';
import { combineReducers } from 'redux';


// Add reducers or import them from other modules

function counter(state = 1, action) {
  switch(action.type) {
    case (types.INCREMENT):
      return state + 1;

    default:
      return state;
  }
}

function items(state = [], action) {

  switch(action.type) {
    case (types.ADD_ITEM):
      return [...state, { id: action.id, text: action.text }];

    default:
      return state;
  }

}


// Export reducers as global reducer

export default combineReducers({ items, counter });