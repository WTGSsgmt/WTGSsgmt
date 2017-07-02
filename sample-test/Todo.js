var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;
// var localstorage = localStorage.getItem('todoItems' || '{}');
// localstorage = localstorage.replace('[', '');
// localstorage = localstorage.replace(']', '');
// localstorage = localstorage.replace('\"', '');
// console.log('parseしない中身'+localstorage);
// 
// var local = JSON.parse(localStorage.getItem('todoItems'));
// console.log('parseする中身'+local);

// var session = sessionStorage.getItem('todoItems');
// session = session.replace(/"id"/g, 'id');
// session = session.replace(/"name"/g, 'name');
// console.log(session);

var TodoApp = React.createClass({
	getInitialState: function() {
      return {todos: []};
     },
     onAdd: function(newTodo) {
     	this.setState({
     			todos : this.state.todos.concat({item:newTodo, status:0})
     	});
     },
     
     onDelete: function() {
     	var targetTodo = this.state.todos[i];
     	targetTodo.status = 1;
     	this.setState({
     		todos: this.state.todos
     	});
     },
     
     render: function() {
     	return (
     		<div className="TodoApp">
     			<TodoCreator onAdd={this.onAdd}/>
     			<TodoList todos={this.state.todos} onDelete={this.onDelete}/>
     		</div>
     );
   }
   });

var TodoCreator = React.createClass({
	getInitialState: function() {
		return {
			value: ""
		}
	},
  change: function(event) {
  	this.setState({newItem: event.target.value});
  },
  add: function(event) {
  	var idName = {id: Date.now(), name: this.state.newItem};
    var newItems = this.state.todoItems.concat(idName);
//     console.log(idName);
//     console.log(newItems);
    sessionStorage.setItem('todoItems', JSON.stringify(newItems));
    this.setState({todoItems: newItems});
    this.setState({newItem: ''})
  },
//   delete: function(i) {
//   	var tempItems = this.state.todoItems;
//     tempItems.splice(i, 1);
//     this.setState({todoItems: tempItems});
//   },
  render: function() {
  	var currentItems = this.state.todoItems.map((item, i) =>
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
        onChange={this.change}
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

// var localstorage = localStorage.getItem('todoItems');

ReactDOM.render(
	<TodoApp />,
  document.getElementById('content')
);
