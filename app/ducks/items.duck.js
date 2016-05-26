// Types

const CREATE  = 'my-app/items/CREATE';
const REMOVE  = 'my-app/items/REMOVE';
const UPDATE  = 'my-app/items/UPDATE';
const TOGGLE  = 'my-app/items/TOGGLE';
const REQUEST = 'my-app/items/REQUEST';
const RECEIVE = 'my-app/items/RECEIVE';
const FILTER  = 'my-app/items/FILTER';


// Reducers

const initialState = {
  counter: 0,
  fetching: false,
  filter: 'All',
  itemsById: {}
};

function itemsById(state = {}, action = {}) {
  switch (action.type) {

    case CREATE:
    case RECEIVE:
      return Object.assign({}, state, {
        [action.id]: { id: action.id, text: action.text, done: false }
      });

    case UPDATE:
      return Object.assign({}, state, {
        [action.id]: { ...state[action.id], text: action.text }
      });

    case TOGGLE:
      return Object.assign({}, state, {
        [action.id]: { ...state[action.id], done: !state[action.id].done }
      });

    case REMOVE:
      return Object.assign({}, Object.keys(state)
        .filter(id => id != action.id)
        .reduce((acc, id) => {
          acc[id] = Object.assign({}, state[id]);
          return acc;
        }, {})
      );

    default:
      return state;
  }
}

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {

    case CREATE:
    case RECEIVE:
      return Object.assign({}, state, {
        counter: state.counter + 1,
        fetching: false,
        itemsById: itemsById(state.itemsById, { ...action, id: state.counter + 1 })
      });

    case REMOVE:
    case UPDATE:
    case TOGGLE:
      return Object.assign({}, state, {
        itemsById: itemsById(state.itemsById, action)
      });

    case REQUEST:
      return Object.assign({}, state, { fetching: true });

    case FILTER:
      return Object.assign({}, state, { filter: action.filter });

    default:
      return state;
  }
}


// Actions

export function createItem(text) {
  return { type: CREATE, text };
}

export function removeItem(id) {
  return { type: REMOVE, id };
}

export function updateItem(id, text) {
  return { type: UPDATE, id, text };
}

export function toggleItem(id) {
  return { type: TOGGLE, id };
}

export function fetchItem(text) {
  return (dispatch) => {
    setTimeout(() => dispatch({ type: REQUEST, text }), 0);
    setTimeout(() => dispatch({ type: RECEIVE, text }), 2000);
  };
}

export function setFilter(filter) {
  return { type: FILTER, filter };
}
