class MessagesChannel < ApplicationCable::Channel
  def subscribed
    room_id = params["roomId"]
    room = Room.includes(:messages).find_by(slug: room_id)
    stream_for room
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end
end
