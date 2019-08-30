import React from 'react';
import './MessageListItem.css'
const MessageListItem = (props) => {
  let message = props.message
  return (
    <div className="message-wrapper">
      <p className="message-body">{message.attributes.body}</p>
    </div>
  )
}

export default MessageListItem;