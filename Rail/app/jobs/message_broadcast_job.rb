class MessageBroadcastJob < ApplicationJob
  queue_as :default

  def perform(message)
    serialized_json = MessageSerializer.new(message)
    room = message.room
    MessagesChannel.broadcast_to(room, serialized_json) 
  end
end
