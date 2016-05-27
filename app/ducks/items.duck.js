import { fromJS } from 'immutable';


// Types

const CREATE  = 'my-app/items/CREATE';
const REMOVE  = 'my-app/items/REMOVE';
const UPDATE  = 'my-app/items/UPDATE';
const TOGGLE  = 'my-app/items/TOGGLE';
const REQUEST = 'my-app/items/REQUEST';
const RECEIVE = 'my-app/items/RECEIVE';
const FILTER  = 'my-app/items/FILTER';


// Initial state and reducers

const initial = fromJS({
  counter: 0,
  fetching: false,
  filter: 'All',
  data: {},
});

export default function reducer(state = initial, action = {}) {
  switch (action.type) {

    case CREATE:
    case RECEIVE:
      const counter = state.get('counter') + 1;
      return state.mergeDeep({
        counter,
        fetching: false,
        data: {
          [counter]: {
            id: counter.toString(),
            text: action.payload.text,
            done: false,
          }
        }
      });

    case REMOVE:
      return state.deleteIn(['data', action.payload.id]);

    case UPDATE:
      return state.setIn(['data', action.payload.id, 'text'], action.payload.text);

    case TOGGLE:
      return state.updateIn(['data', action.payload.id, 'done'], done => !done);

    case REQUEST:
      return state.set('fetching', true);

    case FILTER:
      return state.set('filter', action.payload.filter);

    default:
      return state;
  }
}


// Actions

export function createItem(text) {
  return { type: CREATE, payload: { text }};
}

export function removeItem(id) {
  return { type: REMOVE, payload: { id }};
}

export function updateItem(id, text) {
  return { type: UPDATE, payload: { id, text }};
}

export function toggleItem(id) {
  return { type: TOGGLE, payload: { id }};
}

export function fetchItem(text) {
  return (dispatch) => {
    setTimeout(() => dispatch({ type: REQUEST, payload: { text }}), 0);
    setTimeout(() => dispatch({ type: RECEIVE, payload: { text }}), 2000);
  };
}

export function setFilter(filter) {
  return { type: FILTER, payload: { filter }};
}
