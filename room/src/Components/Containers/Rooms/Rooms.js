import React, { Component } from 'react';
import {getRooms, createRoom} from '../../../Services/rooms'
import RoomListItem from '../../List/RoomListItem/RoomListItem'
import './Rooms.css'
import { thisExpression } from '@babel/types';
class Rooms extends Component {
  state = {
    // rooms: [],
    roomName: ''
  }
  // componentDidMount = () => {
  //   this.fetchRooms()
  // }

  // fetchRooms = () => {
  //   getRooms().then(response => response.json())
  //   .then(object => {
  //     if (object.data) {
  //       this.setState({
  //         rooms: object.data
  //       })
  //     }
  //   })
  // }

  // showRoomsList = () => {
  //   let rooms = this.state.rooms
  //   if (rooms) {
  //     return rooms.map((room, index) => {
  //       return (
  //         <RoomListItem room={room} key={index}></RoomListItem>
  //       )
  //     })
  //   }
  // }

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
    <div>
      {/* {this.showRoomsList()} */}
      <div>
        <input onChange={this.roomNameHandler}></input>
        <button onClick={this.roomCreationClickHandler}>Create Private Room</button>
      </div>
    </div>
    
    );
  }
}

export default Rooms;