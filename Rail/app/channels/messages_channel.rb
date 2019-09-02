class MessagesChannel < ApplicationCable::Channel
  def subscribed
    room_id = params["roomId"]
    room = Room.includes(:messages).find_by(slug: room_id)
    room.update(users_count: room.users_count + 1)
    stream_for room
  end

  def unsubscribed
    room_id = params["roomId"]
    room = Room.includes(:messages).find_by(slug: room_id)
    if room.users_count > 0
      room.update(users_count: room.users_count - 1)
    end
  end
end
