import React from 'react'
import {render} from 'react-dom'
 
export class TodoList extends React.Component {
  handleDelete(){
    this.props.onTodoDelate(this.props.todo.id)
  }
 
  render() {
    return (
      <div className="todo">
        <h2 className="todoTitle">{this.props.todo.title}</h2>
        <div>{this.props.todo.text}</div>
        <button onClick={this.handleDelete.bind(this)}>削除</button>
      </div>
    )
  }
}
