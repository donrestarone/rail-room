class Message < ApplicationRecord
  belongs_to :room
  default_scope { order(created_at: :asc) }
end
