import React from 'react';
import actions from '../actions';
import '../styles/App.css';

import Editable from './Editable.jsx';


class App extends React.Component {

  addItem() {
    this.props.dispatch(actions.addItem('New Item'));
  }

  removeItem(id) {
    this.props.dispatch(actions.removeItem(id));
  }

  editItem(id, text) {
    this.props.dispatch(actions.editItem(id, text));
  }

  fetchItem() {
    this.props.dispatch(actions.fetchItem('New Item'));
  }

  render() {
    return (
      <div className="app">
        <h1>Hello, React!</h1>
        <p>
          [<a href="#" onClick={this.addItem.bind(this)}>Add</a>]
          {' '}
          [<a href="#" onClick={this.fetchItem.bind(this)}>Request</a>]
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
  }

}

export default App;