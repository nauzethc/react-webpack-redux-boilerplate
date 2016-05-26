import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { persistState } from 'redux-devtools';
import DevTools from '../containers/DevTools';
import reducers from '../reducers';


export default function configure(initialState = {}) {

  // Apply middlewares and create store
  const store = createStore(
    reducers,
    initialState,
    compose(
      applyMiddleware(
        thunkMiddleware
      ),
      DevTools.instrument(),
      persistState(window.location.href.match(
        /[?&]debug_session=([^&]+)\b/
      ))
    )
  );

  // Re-add reducer on change if 'hot' module is present
  if (module.hot) {
    module.hot.accept('../reducers', () => {
      const nextReducers = require('../reducers').default;
      store.replaceReducer(nextReducers);
    });
  }

  // Enable access from global object
  window.__store = store;

  return store;
}
