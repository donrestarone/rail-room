class Api::V1::MessagesController < ApplicationController

  def create
    room_id = params["room_id"]
    room = Room.find_by(id: room_id)
    message = params["message_body"]
    message = room.messages.create(body: message)
    render json: MessageSerializer.new(message)
  end
end