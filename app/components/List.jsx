import React, { PropTypes } from 'react';
import Editable from './Editable';


export default React.createClass({

  propTypes: {
    items:    PropTypes.array.isRequired,
    onRemove: PropTypes.func.isRequired,
    onUpdate: PropTypes.func.isRequired,
    onToggle: PropTypes.func.isRequired,
  },

  render() {
    return (
      <ul className="list">
      { this.props.items.map(item => (
        <li key={item.id}>
          <input
            type="checkbox"
            checked={item.done}
            onChange={() => this.props.onToggle(item.id)} />
          <Editable
            value={item.text}
            onEdit={(text) => this.props.onUpdate(item.id, text)} />
          <button
            onClick={() => this.props.onRemove(item.id)}>
            &times;
          </button>
        </li>
      )) }
      </ul>
    );
  },

});
