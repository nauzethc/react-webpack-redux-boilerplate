import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import Items from './containers/Items';
import configureStore from './store';


// Set store and inital state (optional)
const store = configureStore({
  items: {
    counter: 3,
    fetching: false,
    filter: 'All',
    itemsById: {
      1: { id: 1, text: 'Buy some groceries', done: false },
      2: { id: 2, text: 'Take a walk', done: true },
      3: { id: 3, text: 'Wash the car', done: false },
    }
  }
});


// Load styles
require('./styles/screen.css');


// Render app
ReactDOM.render((
  <Provider store={store}>
    <div>
      <Items />
      { (() => {
          if ( process.env.NODE_ENV !== 'production' ) {
            const DevTools = require('./containers/DevTools.jsx').default;
            return <DevTools />;
          } else {
            return null;
          }
      })() }
    </div>
  </Provider>
), document.getElementById('app'));
