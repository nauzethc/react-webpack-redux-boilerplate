import React, { PropTypes } from 'react';


export default React.createClass({

  propTypes: {
    onChange: PropTypes.func.isRequired,
    values:   PropTypes.array.isRequired,
    selected: PropTypes.string.isRequired,
  },

  render() {
    return (
      <div className="selector">
        { this.props.values.map(value => {
          if (this.props.selected === value) {
            return (
              <button key={value}
                disabled
                className="disabled">
                { value }
              </button>
            );
          } else {
            return (
              <button key={value}
                onClick={() => this.props.onChange(value)}>
                { value }
              </button>
            );
          }
        }) }
      </div>
    );
  },

});
