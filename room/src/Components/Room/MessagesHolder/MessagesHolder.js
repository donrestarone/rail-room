import React from 'react';
import MessageListItem from '../../List/MessageListItem/MessageListItem'
const MessagesHolder = (props) => {
  const messages = props.messages
  const showMessages = () => {
    if (messages) {
      return messages.map((message, index) => {
        return (
          <MessageListItem message={message} key={index}></MessageListItem>
        )
      })
    }
  }
  return (
    <div className="room-wrapper"> 

      <div className="messages-wrapper">
        {showMessages()}
      </div>
      <div className="input-wrapper">
        <input type="text" onChange={props.handleInput} value={props.message} onKeyUp={props.handleMacroKeyInput}></input>
      </div>
    </div>
  )
}

export default MessagesHolder;