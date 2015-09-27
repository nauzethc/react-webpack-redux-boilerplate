import React from 'react';

class Editable extends React.Component {

  constructor(props) {
    super(props);
    this.state = { isEditing: false };
    this._toggleEdit = this._toggleEdit.bind(this);
  }

  _toggleEdit() {
    if (this.state.isEditing && this.props.onEdit) {
      const value = React.findDOMNode(this.refs.inputValue).value.trim();
      if (value !== this.props.value) this.props.onEdit(value);
    }
    this.setState({ isEditing: !this.state.isEditing });
  }

  render() {
    let editable;
    if (this.state.isEditing) {
      editable = <input type="text"
        ref="inputValue"
        autoFocus="true"
        defaultValue={this.props.value}
        onBlur={this._toggleEdit} />;
    } else {
      editable = <span onClick={this._toggleEdit}>{this.props.value}</span>
    }
    return editable;
  }

}

export default Editable;