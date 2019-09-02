import React, { Component } from 'react';
import { connect } from 'react-redux'
import {showRoom} from '../../../Services/rooms'
import {createMessage} from '../../../Services/messages'
import MessageListItem from '../../List/MessageListItem/MessageListItem'
import {getApiWebsocketRoot} from '../../../Constants/Api'
// import { ActionCableProvider, ActionCable } from 'react-actioncable-provider';
import MessagesHolder from '../../../Components/Room/MessagesHolder/MessagesHolder'
import ActionCable from 'actioncable'
import {changeClassesOfRefs} from '../../../Utilities/HTMLhelpers'
import {getDisplayName} from '../../../Utilities/GetDisplayName'
import './Room.css'
class Room extends Component {

  state = {
    messages: [],
    roomName: null,
    message: '',
    // this is how we keep track of all the html element's style that need to be changed when dark mode is toggled
    refs: [],
    connected: false,
    users: 0
  }

  renderViewMode = () => {
    let isDark = this.props.shouldBeDarkMode 
    let domNodes = this.state.refs
    if (isDark) {
      changeClassesOfRefs(domNodes, true)
    } else {
      changeClassesOfRefs(domNodes, false)
    }
  }

  componentWillMount = () => {
    let roomId = this.props.match.params.id
    this.initializeActionCable(roomId)
    this.checkDisplayName()
  }

  checkDisplayName = () => {
    // check session storage to see if a user name is defined, otherwise ask to define it
    let displayName = getDisplayName()
    if (displayName) {
      // do nothing
    } else {
      let name = window.prompt("Please enter your name");
      sessionStorage.setItem('name', name)
    }
  }

  initializeActionCable = (roomId) => {
    let cable = ActionCable.createConsumer(getApiWebsocketRoot(roomId))
    cable.subscriptions.create(
      { 
      channel: 'MessagesChannel', roomId: roomId 
      },
      { 
        received: (data) => { this.handleReceivedMessage(data)},
        connected: () => { this.toggleCableConnectedStatus() },
        disconnected: () => { this.toggleCableConnectedStatus() },
      }
    )
  }

  toggleCableConnectedStatus = () => {
    
    this.setState(prevState => ({
      connected: !prevState.connected
    }), () => {
      let connected = this.state.connected
      if (connected) {
        console.log('connected')
      } else {
        console.log('connected')
      }
    })
  }
  handleMessageInput = (e) => {
    let input = e.target.value
    this.setState({message: input})
  }
  
  handleMacroKeyInput = (e) => {
    if (e.key === 'Enter') {
      let message = this.state.message
      let name = getDisplayName()
      if (message) {
        let roomId = this.props.match.params.id
        this.cleanUpAfterMessageSend()
        this.postNewMessage(roomId, message, name)
      }
    }    
  }

  cleanUpAfterMessageSend = () => {
    this.setState({message: ''})
  }

  postNewMessage = (roomId, message, name) => {
    createMessage(roomId, message, name).then(response => response.json())
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
      let users = object.data.attributes.users_count
      this.setState({
        messages,
        roomName,
        users: users
      }, console.log(this.state))
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
    // there are 2 types of object recieved here. message or room
    if (object.data.type === 'room') {
      let room = object.data 
      this.updateRoomState(room)
    } else {
      let message = object.data
      this.updateMessageListState(message)
    }
  }

  updateRoomState = (room) => {
    this.setState({users: room.attributes.users_count}, () => {
      console.log(this.state)
    })
  }

  showRoomName = () => {
    let roomName = this.state.roomName
    if (roomName) {
      return roomName
    }
  }

  showCableConnectionStatus = () => {
    let connected = this.state.connected
    if (connected) {
      return <small>Connected!</small>
    } else {
      return <small>Please refresh page to load new messages</small>
    }
  }
  render() {
    this.renderViewMode()
    return (
      <div className="room-wrapper" ref={roomWrapper => this.state.refs[0] = roomWrapper}>
        <div className="room-title-wrapper">
          <h1 className="room-title">{this.showRoomName()} ({this.state.users})</h1>
          <button onClick={this.props.onNightModeToggle}>NightMode</button>
          <input value={`${window.location.href}`}></input>
          {this.showCableConnectionStatus()}
        </div>
        <MessagesHolder handleInput={this.handleMessageInput} handleMacroKeyInput={this.handleMacroKeyInput} message={this.state.message} messages={this.state.messages}></MessagesHolder>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onNightModeToggle: () => dispatch({
      type: 'toggleNightModeStatus'
    })
  }
}

const mapStateToProps = state => {
  return {
    shouldBeDarkMode: state.darkMode
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Room);