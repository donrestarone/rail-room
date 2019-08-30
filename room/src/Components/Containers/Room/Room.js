import React, { Component } from 'react';
import {showRoom} from '../../../Services/rooms'
import {createMessage} from '../../../Services/messages'
import MessageListItem from '../../List/MessageListItem/MessageListItem'
import './Room.css'
class Room extends Component {

  state = {
    messages: [],
    roomName: null,
    message: ''
  }

  handleMessageInput = (e) => {
    let input = e.target.value
    this.setState({message: input})
  }
  
  handleMacroKeyInput = (e) => {
    if (e.key === 'Enter') {
      let message = this.state.message
      if (message) {
        let roomId = this.props.match.params.id
        this.cleanUpAfterMessageSend()
        this.postNewMessage(roomId, message)
      }
    }    
  }

  cleanUpAfterMessageSend = () => {
    this.setState({message: ''})
  }

  postNewMessage = (roomId, message) => {
    createMessage(roomId, message).then(response => response.json())
    .then(object => {
      if (object.data) {
        let message = object.data
        this.setState(prevState => ({
          messages: [...prevState.messages, message]
        }))
      }
    })
  }

  componentDidMount = () => {
    this.fetchMessages()
  }

  fetchMessages = () => {
    let roomId = this.props.match.params.id
    showRoom(roomId).then(response => response.json())
    .then(object => {
      let messages = object.data.attributes.messages.data
      let roomName = object.data.attributes.name
      this.setState({
        messages,
        roomName
      })
    })
  }

  showMessages = () => {
    let messages = this.state.messages
    if (messages) {
      return messages.map((message, index) => {
        return (
          <MessageListItem message={message} key={index}></MessageListItem>
        )
      })
    }
  }
  showRoomName = () => {
    let roomName = this.state.roomName
    if (roomName) {
      return roomName
    }
  }
  render() {
    return (
    <div className="room-wrapper"> 
      <div className="room-title-wrapper">
        <h1 className="room-title">{this.showRoomName()}</h1>
      </div>
      <div className="messages-wrapper">
        {this.showMessages()}
      </div>
      <div className="input-wrapper">
        <input type="text" onChange={this.handleMessageInput} value={this.state.message} onKeyUp={this.handleMacroKeyInput}></input>
      </div>
    </div>
    
    );
  }
}

export default Room;