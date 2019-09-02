class RoomSerializer
  include FastJsonapi::ObjectSerializer
  attributes :name, :users_count

  set_id :slug

  attribute :messages do |room|
    MessageSerializer.new(room.messages)
  end
end
