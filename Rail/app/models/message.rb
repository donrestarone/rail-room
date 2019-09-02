class Message < ApplicationRecord
  belongs_to :room
  default_scope { order(created_at: :asc) }
  validates :sender_name, presence: true
  validates :body, presence: true

  after_create_commit { MessageBroadcastJob.perform_later(self) }
end
