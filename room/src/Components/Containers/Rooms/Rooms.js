import React, { Component } from 'react';
import {getRooms, createRoom} from '../../../Services/rooms'
import RoomListItem from '../../List/RoomListItem/RoomListItem'
import './Rooms.css'
class Rooms extends Component {
  state = {
    rooms: []
  }
  componentDidMount = () => {
    this.fetchRooms()
  }

  fetchRooms = () => {
    getRooms().then(response => response.json())
    .then(object => {
      if (object.data) {
        this.setState({
          rooms: object.data
        })
      }
    })
  }

  showRoomsList = () => {
    let rooms = this.state.rooms
    if (rooms) {
      return rooms.map((room, index) => {
        return (
          <RoomListItem room={room} key={index}></RoomListItem>
        )
      })
    }
  }
  render() {
    return (
    <div>
      {this.showRoomsList()}
    </div>
    
    );
  }
}

export default Rooms;