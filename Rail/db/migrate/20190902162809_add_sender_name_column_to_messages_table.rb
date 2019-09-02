class AddSenderNameColumnToMessagesTable < ActiveRecord::Migration[5.2]
  def up
    add_column :messages, :sender_name, :string
  end

  def down
    remove_column :messages, :sender_name, :string
  end
end
