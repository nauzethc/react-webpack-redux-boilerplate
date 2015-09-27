import React from 'react';
import Debugger from './Debugger.jsx';
import { createStore, compose } from 'redux';
import { Provider, connect } from 'react-redux';
import { devTools, persistState } from 'redux-devtools';
import App from '../components/App.jsx';
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


// Set initial state

const initialState = {
  data: {
    counter: 3,
    itemsById: {
      1: { id: 1, text: 'Webpack' },
      2: { id: 2, text: 'Hot Loader' },
      3: { id: 3, text: 'Redux' }
    }
  }
};


// Create store

const store = createFinalStore(reducer, initialState);


// Inject state into App

const AppInjected = connect(state => {
  // Items is exposed as list and counter is hidden to app
  return {
    items: Object.keys(state.data.itemsById)
      .map(id => state.data.itemsById[id])
  };
})(App);


// Export injected component

class Container extends React.Component {

  render() {
    return (
      <div>
        <Provider store={store}>
          { () => <AppInjected /> }
        </Provider>
        { DEBUG ? <Debugger store={store} /> : null }
      </div>
    );
  }

}

export default Container;