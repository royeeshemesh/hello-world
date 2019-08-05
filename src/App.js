import React from 'react';

import Firebase from 'firebase/app';
import 'firebase/database';

Firebase.initializeApp({
  apiKey: "AIzaSyBs7sLGPvi_LRCQyojujkiLv_5h3UPrXvs",
  authDomain: "my-first-project-385de.firebaseapp.com",
  databaseURL: "https://my-first-project-385de.firebaseio.com",
  projectId: "my-first-project-385de",
  storageBucket: "my-first-project-385de.appspot.com",
  messagingSenderId: "724286119664",
  appId: "1:724286119664:web:32aa2d866fee5e5a"
});

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      message: '',
      list: []
    };

    this.messagesRef = Firebase.database().ref();
    this.messagesRef.on('value',snapshot => {
      if (snapshot.val()) {

        this.setState({
          list: Object.values(snapshot.val()).reverse()
        });

      }
    });
  }

  handleMessageChange = e => {
    this.setState({
      message: e.target.value
    });
  };


  handleMessageSubmit = e => {
    e.preventDefault();
    const {message, list} = this.state;

    this.messagesRef.push(message);

    this.setState({
      list: [message, ...list],
      message: ''
    });
  };

  render() {
    const messages = this.state.list.map((message, key) => {
      return (
        <div key={key}>
          <span>{message}</span>
          <hr/>
        </div>
      )
    });

    return (
      <div className="container">
        <div className="row">
          <div className="col">
            <form onSubmit={this.handleMessageSubmit}>
              <div className="form-group">
                <input className="form-control" placeholder="type your message here" value={this.state.message}
                       onChange={this.handleMessageChange}/>
              </div>
              <div className="form-group">
                <button type="submit" className="btn btn-primary">Send</button>
              </div>
            </form>
            <hr/>
            {messages}
          </div>
        </div>
      </div>
    )
  }
}

export default App;
