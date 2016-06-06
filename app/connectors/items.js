import { connect } from 'react-redux';
import {
  createItem,
  removeItem,
  updateItem,
  requestItem,
  toggleItem,
  setFilter,
} from '../ducks/items.duck';


export default (Component) => connect(

  (state, props) => ({
    isFetching : state.getIn(['items', 'fetching']),
    filter     : state.getIn(['items', 'filter']),
    items      : state.getIn(['items', 'data']).filter((item, id) => {
      const filter = state.getIn(['items', 'filter']);
      const done   = item.get('done');
      if (filter === 'Completed'   && !done) return false;
      if (filter === 'Uncompleted' && done)  return false;
      return true;
    }).toArray()
  }),

  (dispatch, props) => ({
    onCreate:  (text)     => dispatch(createItem(text)),
    onRemove:  (id)       => dispatch(removeItem(id)),
    onUpdate:  (id, text) => dispatch(updateItem(id, text)),
    onToggle:  (id)       => dispatch(toggleItem(id)),
    onRequest: (text)     => dispatch(requestItem(text)),
    onFilter:  (filter)   => dispatch(setFilter(filter)),
  })

)(Component);
