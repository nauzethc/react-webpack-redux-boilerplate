import { fromJS } from 'immutable';


// Types

export const CREATE  = 'my-app/items/CREATE';
export const REMOVE  = 'my-app/items/REMOVE';
export const UPDATE  = 'my-app/items/UPDATE';
export const TOGGLE  = 'my-app/items/TOGGLE';
export const REQUEST = 'my-app/items/REQUEST';
export const RECEIVE = 'my-app/items/RECEIVE';
export const FILTER  = 'my-app/items/FILTER';


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

export function requestItem(text) {
  return { type: REQUEST, payload: { text }};
}

export function receiveItem(text) {
  return { type: RECEIVE, payload: { text }};
}

export function setFilter(filter) {
  return { type: FILTER, payload: { filter }};
}
