var mdURI = 'https://cdn.rawgit.com/chjj/marked/master/README.md';

class Dashboard extends React.Component {
  constructor() {
    super();
    this.state = {
      defaultText : null,
      markup : ''
    }
    
    fetch(mdURI).then(response => response.text())
      .then(text => {
        this.setState({defaultText : text})
        this.changeText({target : {value : text}});
    });
  }
  
  changeText(e) {
    this.setState({markup : marked(e.target.value)});
  }
  
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-xs-6">
            {this.state.defaultText !== null ?
              <textarea className="editor" onChange={this.changeText.bind(this)} defaultValue={this.state.defaultText}></textarea>
            : <p>loading...</p>}
          </div>
          <div className="col-xs-6 preview" dangerouslySetInnerHTML={{__html: this.state.markup}}>
          </div>
        </div>
      </div>
    )
  }
}

React.render(<Dashboard />, document.body);