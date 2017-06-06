var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;

var ToDoList = React.createClass({
	getInitialState: function() {
  return {todoItems: [
  	{id: 0, name: 'アイディアを出す'},
    {id: 1, name: 'サンプルを作る'},
    {id: 2, name: 'ドキュメントを書く'}
  ],
  newItem: ''};
	},
  handleEdit: function(event) {
  	this.setState({newItem: event.target.value});
  },
  handleAdd: function(event) {
  	var idName = {id: Date.now(), name: this.state.newItem};
    var newItems = this.state.todoItems.concat(idName);
    this.setState({todoItems: newItems});
    this.setState({newItem: ''})
  },
  handleRemove: function(i) {
  	var tempItems = this.state.todoItems;
    tempItems.splice(i, 1);
    this.setState({todoItems: tempItems});
  },
  render: function() {
  	var currentItems = this.state.todoItems.map((item, i) =>
    	<div key={item.id}>
      	<input
        	type="checkbox"
          defaultChecked={false}
          onChange={() => this.handleRemove(i)}
        />{item.name}
      </div>);
      
    return (<div>
    	ToDo:
      <input
      	type="text"
        value={this.state.newItem}
        onChange={this.handleEdit}
      />
      <input
      	type="button"
        value="追加"
        onClick={this.handleAdd}
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

ReactDOM.render(
	<ToDoList />,
  document.getElementById('content')
);
