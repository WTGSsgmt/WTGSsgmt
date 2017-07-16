import React from 'react'
import { render } from 'react-dom'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
// import { createStore, applyMiddleware } from 'redux'
// import { Provider } from 'react-redux'
// import App from './containers/App'
// import reducer from './reducers'
// import thunk from 'redux-thunk'
// import createLogger from 'redux-logger';
// var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;

var ToDoList = React.createClass({
	getInitialState: function() {
      return {todoItems: JSON.parse(sessionStorage.getItem('todoItems')) || [], newitem: ''};
  },
  handleChange: function(event) {
  	this.setState({newItem: event.target.value});
  },
  add: function(event) {
  	const idName = {id: Date.now(), name: this.state.newItem};
    const newItems = this.state.todoItems.concat(idName);
    sessionStorage.setItem('todoItems', JSON.stringify(newItems));
    this.setState({todoItems: newItems});
    this.setState({newItem: ''});
  },
  delete: function(i) {
  	const tempItems = this.state.todoItems;
    tempItems.splice(i, 1);
    sessionStorage.setItem('todoItems', JSON.stringify(tempItems));
    this.setState({todoItems: tempItems});
  },
  render: function() {
  	const currentItems = this.state.todoItems.map((item, i) =>
    	<div key={item.id}>
      	<input
        	type="checkbox"
          defaultChecked={false}
          onChange={() => this.delete(i)}
        />{item.name}
      </div>);
      
    return (<div>
    	ToDo:
      <input
      	type="text"
        value={this.state.newItem}
        onChange={this.handleChange}
      />
      <input
      	type="button"
        value="追加"
        onClick={this.add}
      />
      <ReactCSSTransitionGroup
      	transitionName="fadingText"
        transitionEnterTimeout={500}
        transitionLeaveTimeout={800}
        transitionAppear={true}
        transitionAppearTimeout={800}>
        {currentItems}
      </ReactCSSTransitionGroup>
    </div>);
  }
});

render(
	<ToDoList />,
  document.getElementById('content')
);
