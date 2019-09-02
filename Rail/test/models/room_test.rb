require 'test_helper'

class RoomTest < ActiveSupport::TestCase
  test "room slugs are unique & secure" do
    1000.times do 
      room_name = SecureRandom.hex(10)
      room = Room.handle_creation(room_name)
      byebug
      assert(room)
    end
  end
end
