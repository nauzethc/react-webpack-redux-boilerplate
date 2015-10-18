import { combineReducers } from 'redux';
import { types } from '../actions/items';


const item = (state = {}, action) => {
  switch (action.type) {

    case types.ADD_ITEM:
    case types.EDIT_ITEM:
    case types.RECEIVE_ITEM:
      return Object.assign({}, state, {
        id: action.id,
        text: action.text
      });

    default:
      return state;
  }
};

const itemsById = (state = {}, action) => {
  switch(action.type) {

    case types.ADD_ITEM:
    case types.EDIT_ITEM:
    case types.RECEIVE_ITEM:
      return Object.assign({}, state, {
        [action.id]: item(state[action.id], action)
      });

    case types.REMOVE_ITEM:
      const newState = {};
      Object.keys(state)
        .filter(id => id != action.id)
        .forEach(id => newState[id] = state[id]);
      return newState;

    default:
      return state;
  }
};

const data = (state = { counter: 0, itemsById: {} }, action) => {
  switch(action.type) {

    case types.ADD_ITEM:
    case types.RECEIVE_ITEM:
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

};

const isFetching = (state = false, action) => {
  switch (action.type) {

    case types.REQUEST_ITEM:
      return true;

    case types.RECEIVE_ITEM:
      return false;

    default:
      return state;
  }
};

export default combineReducers({
  data,
  isFetching
});
