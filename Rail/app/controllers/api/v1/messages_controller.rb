class Api::V1::MessagesController < ApplicationController

  def create
    room_id = params["room_id"]
    room = Room.find_by(slug: room_id)
    message = params["message_body"]
    sender_name = params["sender_name"]
    message = room.messages.create(body: message, sender_name: sender_name)
    serialized_json = MessageSerializer.new(message)
    render json: serialized_json
  end
end