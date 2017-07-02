//	親
var TodoApp = React.createClass({
    getInitialState: function(){
        return {items: [sessionStorage.getItem('todoItems')]};
    },
  updateItems: function(newItem){
    var allItems = this.state.items.concat([newItem]);
    this.setState({items: allItems});
  },
  render: function(){
    return (
      <div>
        <TodoHeader />
        <div className="container theme-showcase">
          <div className="jumbotron">
            <TodoBanner />
            <TodoForm onFormSubmit={this.updateItems} />
            <TodoList items={this.state.items} />
          </div>
        </div>
      </div>
    );
  }
});
//	ヘッダ
var TodoHeader = React.createClass({
  render: function(){
    return(
      <nav className="navbar navbar-inverse ">
        <div className="container">
          <div className="navbar-header">
            <a className="navbar-brand" href="#">React ToDo</a>
          </div>
        </div>
      </nav>
    );
  }
});

//	バナー
var TodoBanner = React.createClass({
  render: function(){
    return (
      <h2>ToDo List items</h2>
    );
  }
});

//   フォーム
var TodoForm = React.createClass({
  getInitialState: function(){
  	console.log(sessionStorage.getItem('todoItems'));
    return {id :[sessionStorage.getItem('todoItems')]}
  },
  handleSubmit: function(e){
    e.preventDefault();
	this.props.onFormSubmit(this.state.item);
//  	var idName = {id: Date.now(), name: this.state.item};
//  	console.log(idName);
//     var newItems = this.state.item.concat(idName);
//    	console.log(newItems);
//   	sessionStorage.setItem('todoItems', JSON.stringify(idName));
    this.setState({item: ''});
	this.refs.item.focus();
    return;
  },
  onChange: function(e){
    this.setState({
      item: e.target.value
    });
  },
  render: function(){
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <input className="form-control input-lg" type="text" placeholder="Enter you todo items" ref='item' onChange={this.onChange} value={this.state.item}/>
          <br/>
          <input type='submit' value='Add item' className="btn-lg btn-primary" />
        </form>
        <br/>
      </div>
    );
  }
});

//	リスト
var TodoList= React.createClass({
  render: function(){
    var createItem = function(itemText){
      return (
        <TodoListItem> {itemText} </TodoListItem>
      );
    };
    return <ul> {this.props.items.map(createItem)}</ul>;
  }
});

//	アイテム
var TodoListItem = React.createClass({
  render: function(){
    return(
      <li>{this.props.children}</li>
    );
  }
});

ReactDOM.render(
  <TodoApp />,
  document.getElementById('content')
);