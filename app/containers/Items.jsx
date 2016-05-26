import React, { PropTypes } from 'react';
import connector from '../connectors/items';

import Editable from '../components/Editable';
import List from '../components/List';
import Form from '../components/Form';
import Selector from '../components/Selector';


const Items = React.createClass({

  propTypes: {
    items: PropTypes.array.isRequired,
    isFetching: PropTypes.bool,
    onCreate: PropTypes.func.isRequired,
    onFetch: PropTypes.func.isRequired,
    onUpdate: PropTypes.func.isRequired,
    onToggle: PropTypes.func.isRequired,
    onRemove: PropTypes.func.isRequired,
    onFilter: PropTypes.func.isRequired,
  },

  render() {
    return (
      <div className="items-container">
        <Form
          isFetching={this.props.isFetching}
          onCreate={this.props.onCreate}
          onFetch={this.props.onFetch} />
        <List
          items={this.props.items}
          onRemove={this.props.onRemove}
          onUpdate={this.props.onUpdate}
          onToggle={this.props.onToggle} />
        <Selector
          values={['All', 'Completed', 'Uncompleted']}
          selected={this.props.filter}
          onChange={this.props.onFilter} />
      </div>
    );
  }

});

export default connector(Items);
