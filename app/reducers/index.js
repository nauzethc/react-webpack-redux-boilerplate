import types from '../actions/types';
import { combineReducers } from 'redux';


// Add reducers or import them from other modules

function item(state = {}, action) {
  switch (action.type) {

    case types.ADD_ITEM:
    case types.EDIT_ITEM:
      return Object.assign({}, state, { id: action.id, text: action.text });

    default:
      return state;
  }
}

function itemsById(state = {}, action) {
  let newState;
  switch(action.type) {

    case types.ADD_ITEM:
    case types.EDIT_ITEM:
      newState = Object.assign({}, state);
      newState[action.id] = item(state[action.id], action);
      return newState;

    case types.REMOVE_ITEM:
      newState = {};
      Object.keys(state)
        .filter(id => id != action.id)
        .forEach(id => newState[id] = state[id]);
      return newState;

    default:
      return state;
  }
}

function data(state = { counter: 0, itemsById: {} }, action) {

  switch(action.type) {
    case types.ADD_ITEM:
      return Object.assign({}, {
        counter: state.counter + 1,
        itemsById: itemsById(state.itemsById, {...action, id: state.counter + 1})}
      );

    case types.REMOVE_ITEM:
    case types.EDIT_ITEM:
      return Object.assign({}, {
        counter: state.counter,
        itemsById: itemsById(state.itemsById, action)
      });

    default:
      return state;
  }

}


// Export reducers as global reducer

export default combineReducers({ data });