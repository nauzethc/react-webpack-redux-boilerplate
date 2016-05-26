import { combineReducers } from 'redux';

// Import "ducks" reducers

import items from '../ducks/items.duck';

// Export reducers as global reducer

export default combineReducers({ items });
