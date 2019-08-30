class Message < ApplicationRecord
  belongs_to :room
  default_scope { order(created_at: :asc) }

  after_create_commit { MessageBroadcastJob.perform_later(self) }
end
