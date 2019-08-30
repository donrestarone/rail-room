import React from 'react';
import {Link} from 'react-router-dom'
import './RoomListItem.css'
const RoomListItem = (props) => {
  const room = props.room
  return (
  <div className="room-list-item-wrapper">
    <Link to={`/rooms/${room.id}`}>{room.attributes.name}</Link>
  </div>
  )
}

export default RoomListItem;