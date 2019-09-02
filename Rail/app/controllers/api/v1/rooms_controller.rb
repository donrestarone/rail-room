class Api::V1::RoomsController < ApplicationController
  def index
    rooms = Room.includes(:messages).all
    render json: RoomSerializer.new(rooms).serialized_json
  end

  def create
    room_name = params["room_name"]
    room = Room.handle_creation(room_name)

    render json: RoomSerializer.new(room).serialized_json
  end

  def show
    room_id = params[:id]
    room = Room.includes(:messages).find_by(slug: room_id)
    if room 
     render json: RoomSerializer.new(room).serialized_json 
    else 
      render json: {code: 404, status: 'not found'}
    end
  end
end