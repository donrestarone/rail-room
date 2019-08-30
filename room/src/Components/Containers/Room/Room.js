import React, { Component } from 'react';
import {showRoom} from '../../../Services/rooms'
import {createMessage} from '../../../Services/messages'
import MessageListItem from '../../List/MessageListItem/MessageListItem'
import {getApiWebsocketRoot} from '../../../Constants/Api'
// import { ActionCableProvider, ActionCable } from 'react-actioncable-provider';
import MessagesHolder from '../../../Components/Room/MessagesHolder/MessagesHolder'
import ActionCable from 'actioncable'
import './Room.css'
class Room extends Component {

  state = {
    messages: [],
    roomName: null,
    message: ''
  }
  componentWillMount = () => {
    let roomId = this.props.match.params.id
    this.initializeActionCable(roomId)
  }

  initializeActionCable = (roomId) => {
    let cable = ActionCable.createConsumer(getApiWebsocketRoot())
    cable.subscriptions.create(
      { channel: 'MessagesChannel', roomId: roomId },
      { received: (data) => { this.handleReceivedMessage(data) } },
      { connected: () => { console.log('connected')} },
      { disconnect: () => { console.log('disconnected')} },
    )
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
        this.updateMessageListState(message)
      }
    })
  }

  updateMessageListState = (newMessage) => {
    let existingMessages = this.state.messages
    let messageExists = existingMessages.some(message => message.id === newMessage.id)
    if (!messageExists) {
      this.setState(prevState => ({
        messages: [...prevState.messages, newMessage]
      }))
    }
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

  handleReceivedMessage = (object) => {
    let message = object.data
    this.updateMessageListState(message)
  }

  showRoomName = () => {
    let roomName = this.state.roomName
    if (roomName) {
      return roomName
    }
  }
  render() {
    return (
      <>
        <div className="room-title-wrapper">
          <h1 className="room-title">{this.showRoomName()}</h1>
        </div>
        <MessagesHolder handleInput={this.handleMessageInput} handleMacroKeyInput={this.handleMacroKeyInput} message={this.state.message} messages={this.state.messages}></MessagesHolder>
      </>
    );
  }
}

export default Room;