import React from 'react';
import actions from '../actions';
import '../styles/App.css';


class App extends React.Component {

  addItem() {
    this.props.dispatch(
      actions.addItem({
        id: this.props.counter,
        text: 'New Item ' + this.props.counter
      })
    );
    this.props.dispatch(actions.increment());
  }

  render() {
    return (
      <div className="app">
        <h1>Hello, React! <a href="#" onClick={this.addItem.bind(this)}>+</a></h1>
        <ul>
          { this.props.items.map(item => {
            return <li key={item.id}>{item.text}</li>;
          }) }
        </ul>
      </div>
    );
  }

}

export default App;