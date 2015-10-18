import React from 'react';
import { creators } from '../actions/items';
import { ItemsConnector } from '../connectors/items';
import '../styles/Items.css';
import Editable from './Editable.jsx';


const Items = React.createClass({

  addItem() {
    this.props.dispatch(creators.addItem('New Item'));
  },

  removeItem(id) {
    this.props.dispatch(creators.removeItem(id));
  },

  editItem(id, text) {
    this.props.dispatch(creators.editItem(id, text));
  },

  fetchItem() {
    this.props.dispatch(creators.fetchItem('New Item'));
  },

  render() {
    return (
      <div className="app">
        <h1>Hello, React!</h1>
        <p>
          [<a href="#" onClick={this.addItem}>Add</a>]
          {' '}
          [<a href="#" onClick={this.fetchItem}>Request</a>]
          {' '}
          {this.props.isFetching ? 'Loading...':''}
        </p>
        <ul>
          { this.props.items.map(item => {
            return (
              <li key={item.id}>
                <Editable value={item.text} onEdit={this.editItem.bind(this, item.id)} />
                {' '}
                <a href="#" onClick={this.removeItem.bind(this, item.id)}>x</a>
              </li>
            );
          }) }
        </ul>
      </div>
    );
  },

});

export default ItemsConnector(Items);
