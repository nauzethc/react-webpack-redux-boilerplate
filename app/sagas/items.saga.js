import { takeEvery } from 'redux-saga';
import { call, put } from 'redux-saga/effects';
import { REQUEST, receiveItem } from '../ducks/items.duck';


function api(text) {
  return new Promise(resolve => {
    setTimeout(() => resolve(text), 2000)
  });
}

function* fetch(action) {
  const item = yield call(api, action.payload.text);
  yield put(receiveItem(item));
}

export default function* saga() {
  yield [
    takeEvery(REQUEST, fetch),
  ]
}
