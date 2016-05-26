import React, { PropTypes } from 'react';


export default React.createClass({

  propTypes: {
    isFetching: PropTypes.bool.isRequired,
    onCreate: PropTypes.func.isRequired,
    onFetch: PropTypes.func.isRequired,
  },

  handleOnClick(action) {
    const value = this.refs.inputText.value.trim();
    if (value) {
      if (action === 'create') {
        this.props.onCreate(value);
      } else {
        this.props.onFetch(value);
      }
      this.refs.inputText.value = '';
    }
  },

  render() {
    return (
      <form className="form" onSubmit={(e) => e.preventDefault()}>
        <input type="text"
          ref="inputText"
          placeholder="Something to do..." />
        <button onClick={(e) => this.handleOnClick('create')}>Create</button>
        { this.props.isFetching
          ? <button disabled className="disabled">Fetching...</button>
          : <button onClick={(e) => this.handleOnClick('fetch')}>Fetch</button>
        }
      </form>
    );
  },

});
