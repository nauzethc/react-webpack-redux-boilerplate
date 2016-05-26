import React, { PropTypes } from 'react';


export default React.createClass({

  propTypes: {
    value: PropTypes.string.isRequired,
    onEdit: PropTypes.func.isRequired,
  },

  getInitialState() {
    return { isEditing: false };
  },

  toggleEdit() {
    if (this.state.isEditing && this.props.onEdit) {
      const value = this.refs.inputText.value.trim();
      if (value !== this.props.value) this.props.onEdit(value);
    }
    this.setState({ isEditing: !this.state.isEditing });
  },

  render() {
    if (this.state.isEditing) {
      return <input className="editable"
        type="text"
        ref="inputText"
        autoFocus="true"
        defaultValue={this.props.value}
        onBlur={this.toggleEdit} />
      ;
    } else {
      return <span className="editable"
        onClick={this.toggleEdit}>{this.props.value}</span>;
    }
  },

});
