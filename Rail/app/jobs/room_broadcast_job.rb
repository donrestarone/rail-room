class RoomBroadcastJob < ApplicationJob
  queue_as :default

  def perform(room)
    serialized_json = RoomSerializer.new(room)
    MessagesChannel.broadcast_to(room, serialized_json) 
  end
end
