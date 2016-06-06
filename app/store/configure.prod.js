import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import reducers from '../reducers';

import itemsSaga from '../sagas/items.saga';


export default function configure(initialState = {}) {

  const sagaMiddleware = createSagaMiddleware();

  // Apply middlewares and create store
  const store = createStore(
    reducers,
    initialState,
    compose(applyMiddleware(sagaMiddleware))
  );

  // Run sagas
  sagaMiddleware.run(itemsSaga);

  return store;
}
