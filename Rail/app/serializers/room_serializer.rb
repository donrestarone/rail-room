class RoomSerializer
  include FastJsonapi::ObjectSerializer
  attributes :name, :id

  attribute :messages do |room|
    MessageSerializer.new(room.messages)
  end
end
