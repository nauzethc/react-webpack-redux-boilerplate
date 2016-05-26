import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import reducers from '../reducers';


export default function configure(initialState = {}) {

  // Apply middlewares and create store
  const store = createStore(
    reducers,
    initialState,
    compose(
      applyMiddleware(
        thunkMiddleware
      )
    )
  );

  return store;
}
