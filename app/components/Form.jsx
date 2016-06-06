import React, { PropTypes } from 'react';


export default React.createClass({

  propTypes: {
    isFetching: PropTypes.bool.isRequired,
    onCreate: PropTypes.func.isRequired,
    onRequest: PropTypes.func.isRequired,
  },

  handleSubmit(e) {
    e.preventDefault();
    e.stopPropagation();
    this.handleClick('create');
  },

  handleClick(action) {
    const value = this.refs.inputText.value.trim();
    if (value) {
      if (action === 'create') {
        this.props.onCreate(value);
      } else {
        this.props.onRequest(value);
      }
      this.refs.inputText.value = '';
    }
  },

  render() {
    return (
      <form className="form" onSubmit={this.handleSubmit}>
        <input type="text"
          ref="inputText"
          placeholder="Something to do..." />
        <button onClick={(e) => this.handleClick('create')}>Create</button>
        { this.props.isFetching
          ? <button disabled className="disabled">Fetching...</button>
        : <button onClick={(e) => this.handleClick('request')}>Request</button>
        }
      </form>
    );
  },

});
