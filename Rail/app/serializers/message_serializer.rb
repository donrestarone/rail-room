class MessageSerializer
  include FastJsonapi::ObjectSerializer
  attributes :body, :room_id, :sender_name
end
