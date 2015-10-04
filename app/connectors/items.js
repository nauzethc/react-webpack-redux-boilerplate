import { connect } from 'react-redux';


export default ItemsConnector = (Component) => {
  return connect((state) => {
    return {
      isFetching: state.items.isFetching,
      items: Object.keys(state.items.data.itemsById)
        .map(id => state.items.data.itemsById[id])
    }
  })(Component);
};
