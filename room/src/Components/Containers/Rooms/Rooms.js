import React, { Component } from 'react';
import {getRooms, createRoom} from '../../../Services/rooms'
import RoomListItem from '../../List/RoomListItem/RoomListItem'
import './Rooms.css'
import { thisExpression } from '@babel/types';
class Rooms extends Component {
  state = {
    roomName: ''
  }

  roomCreationClickHandler = () => {
    let name = this.state.roomName
    if (name) {
      createRoom(name).then(response => response.json())
      .then(object => {
        if (object.data) {
          let roomId = object.data.id
          window.location.href = `${window.location.href}rooms/${roomId}`
        } else {
          alert('internal server error')
        }
      })
    } else {
      alert('Enter a room name first')
    }
  }

  roomNameHandler = (e) => {
    let name = e.target.value
    if (name) {
      this.setState({roomName: name})
    }
  }
  render() {
    return (
      <div className="welcome-wrapper">
        <h1>Welcome to the Railroad</h1>
        <p>Your secret messenger</p>
        <div>
          <p>To begin: create a room with a name &amp; share the link with a friend. Only people who you give the link to will be able to read the messages/respond.</p>
        </div>
        <div className="room-name-input-wrapper">
          <input onChange={this.roomNameHandler} placeholder="enter room name" className="room-name-input"></input>
        </div>
        <div className="room-creation-wrapper">
          <button onClick={this.roomCreationClickHandler} className="create-room-button">Create Private Room</button>
        </div>
      </div>
    
    );
  }
}

export default Rooms;