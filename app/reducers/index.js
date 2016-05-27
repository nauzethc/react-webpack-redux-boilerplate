import { combineReducers } from 'redux-immutable';

// Import "ducks" reducers

import items from '../ducks/items.duck';

// Export reducers as global reducer

export default combineReducers({ items })
