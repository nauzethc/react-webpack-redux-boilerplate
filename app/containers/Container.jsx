import React from 'react';
import Debugger from './Debugger.jsx';
import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { Provider } from 'react-redux';
import { devTools, persistState } from 'redux-devtools';
import Items from '../components/Items.jsx';
import reducer from '../reducers';


// Enable 'redux-devtools' if DEBUG is present

let createFinalStore;

if (DEBUG) {
  createFinalStore = compose(
    devTools(),
    persistState(window.location.href.match(/[?&]debug_session=([^&]+)\b/))
  )(createStore);

} else {
  createFinalStore = createStore;
}


// Enable thunk middleware (enable functions dispatching)

createFinalStore = applyMiddleware(thunkMiddleware)(createFinalStore);


// Set initial state

const initialState = {
  items: {
    data: {
      counter: 3,
      itemsById: {
        1: { id: 1, text: 'Webpack' },
        2: { id: 2, text: 'Hot Loader' },
        3: { id: 3, text: 'Redux' }
      }
    }
  }
};


// Create store

const store = createFinalStore(reducer, initialState);


// Export injected component

export default (props) => {
  return (
    <div>
      <Provider store={store}>
        <Items />
      </Provider>
      { DEBUG ? <Debugger store={store} /> : null }
    </div>
  );
};
