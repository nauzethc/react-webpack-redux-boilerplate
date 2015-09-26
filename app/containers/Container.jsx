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
  counter: 4,
  items: [
    { id: 1, text: 'Webpack' },
    { id: 2, text: 'Hot Loader' },
    { id: 3, text: 'Redux' },
  ]
};


// Inject state into App

const store = createFinalStore(reducer, initialState);
const AppInjected = connect(state => state)(App);


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