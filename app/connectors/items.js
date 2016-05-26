import { connect } from 'react-redux';
import {
  createItem,
  removeItem,
  updateItem,
  fetchItem,
  toggleItem,
  setFilter,
} from '../ducks/items.duck';


export default (Component) => connect(

  (state, props) => ({
    isFetching: state.items.fetching,
    filter: state.items.filter,
    items: Object.keys(state.items.itemsById)
      .map(id => state.items.itemsById[id])
      .filter(item => {
        if ((state.items.filter === 'Completed'   && !item.done) ||
            (state.items.filter === 'Uncompleted' && item.done)) {
            return false;
        }
        return true;
      })
  }),

  (dispatch, props) => ({
    onCreate: (text)     => dispatch(createItem(text)),
    onRemove: (id)       => dispatch(removeItem(id)),
    onUpdate: (id, text) => dispatch(updateItem(id, text)),
    onToggle: (id)       => dispatch(toggleItem(id)),
    onFetch:  (text)     => dispatch(fetchItem(text)),
    onFilter: (filter)   => dispatch(setFilter(filter)),
  })

)(Component);
