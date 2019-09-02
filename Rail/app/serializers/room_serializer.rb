class RoomSerializer
  include FastJsonapi::ObjectSerializer
  attributes :name

  set_id :slug

  attribute :messages do |room|
    MessageSerializer.new(room.messages)
  end
end
