import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { persistState } from 'redux-devtools';
import DevTools from '../containers/DevTools';
import reducers from '../reducers';

import itemsSaga from '../sagas/items.saga';


export default function configure(initialState = {}) {

  const sagaMiddleware = createSagaMiddleware();

  // Apply middlewares and create store
  const store = createStore(
    reducers,
    initialState,
    compose(
      applyMiddleware(sagaMiddleware),
      DevTools.instrument(),
      persistState(window.location.href.match(
        /[?&]debug_session=([^&]+)\b/
      ))
    )
  );

  // Run sagas
  sagaMiddleware.run(itemsSaga);

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
