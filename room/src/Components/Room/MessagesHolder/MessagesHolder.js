
import React, { Component } from 'react';
import MessageListItem from '../../List/MessageListItem/MessageListItem'
import './MessagesHolder.css'

class MessagesHolder extends Component {
  showMessages = () => {
    const messages = this.props.messages
    console.log(messages)
    if (messages) {
      return messages.map((message, index) => {
        return (
          <MessageListItem message={message} key={index}></MessageListItem>
        )
      })
    }
  }


  componentDidUpdate = () => {
    const messageBody = document.getElementById('messages-wrapper')
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
      <div className="message-input-wrapper">
        <input type="text" onChange={this.props.handleInput} placeholder="type a message, hit enter to send" value={this.props.message} onKeyUp={this.props.handleMacroKeyInput} className="message-input"></input>
      </div>
    </>
    
    );
  }
}

export default MessagesHolder;