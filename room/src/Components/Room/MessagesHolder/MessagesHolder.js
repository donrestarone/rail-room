
import React, { Component } from 'react';
import MessageListItem from '../../List/MessageListItem/MessageListItem'
import './MessagesHolder.css'

class MessagesHolder extends Component {
  showMessages = () => {
    const messages = this.props.messages
    if (messages) {
      return messages.map((message, index) => {
        return (
          <MessageListItem message={message} key={index}></MessageListItem>
        )
      })
    }
  }

  componentDidMount = () => {
    const messageBody = document.getElementById('messages-wrapper')
    messageBody.scrollTop = messageBody.scrollHeight;
  }

  componentDidUpdate = () => {
    const messageBody = document.getElementById('messages-wrapper')
    console.log(messageBody.scrollTop, messageBody.scrollHeight, messageBody.clientHeight)
    messageBody.scrollTop = messageBody.scrollHeight;

  }
  render() {
    return (
    <>
      <div className="messages-wrapper" id="messages-wrapper">
        {this.showMessages()}
      </div>
      <div className="input-wrapper">
      </div>
        <input type="text" onChange={this.props.handleInput} value={this.props.message} onKeyUp={this.props.handleMacroKeyInput} className="message-input"></input>
    </>
    
    );
  }
}

export default MessagesHolder;