import React from 'react';

const Editable = React.createClass({

  getInitialState() {
    return { isEditing: false };
  },

  toggleEdit() {
    if (this.state.isEditing && this.props.onEdit) {
      const value = this.refs.inputValue.value.trim();
      if (value !== this.props.value) this.props.onEdit(value);
    }
    this.setState({ isEditing: !this.state.isEditing });
  },

  render() {
    let editable;
    if (this.state.isEditing) {
      editable = <input type="text"
        ref="inputValue"
        autoFocus="true"
        defaultValue={this.props.value}
        onBlur={this.toggleEdit} />;
    } else {
      editable = <span onClick={this.toggleEdit}>{this.props.value}</span>
    }
    return editable;
  },

});

export default Editable;
