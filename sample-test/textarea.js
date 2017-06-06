var TextArea = React.createClass({
	getInitialState: function() {
		return {dispText: this.props.dispText};
	},
	handleInput: function(event) {
		this.setState({dispText: event.target.value})
		console.log(this.state.dispText);
	},
	render: function() {
  	return (<div>何か入力してください:
      <textarea 
      	value={this.state.dispText}
      	onChange={this.handleInput}
      	rows="3"
      />
      </div>);
  	}
  });
  
  ReactDOM.render(
  	<TextArea dispText='未編集' />,
    document.getElementById('content')
	);