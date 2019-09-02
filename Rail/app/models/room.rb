class Room < ApplicationRecord
  has_many :messages
  validates :slug, uniqueness: true, presence: true

  after_update_commit { RoomBroadcastJob.perform_later(self) }

  def self.handle_creation(room_name)
    room = Room.new(users_count: 0)
    room.generate_slug
    room.name = room_name
    if room.save
      return room
    else  
      return false
    end
  end

  def generate_slug
    generated_slug = SecureRandom.hex(10)
    if Room.find_by(id: generated_slug)
      self.generate_slug
    else 
      return self.slug = generated_slug
    end
  end 
end
