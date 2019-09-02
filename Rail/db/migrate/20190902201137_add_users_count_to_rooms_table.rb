class AddUsersCountToRoomsTable < ActiveRecord::Migration[5.2]
  def up
    add_column :rooms, :users_count, :integer
  end

  def down
    remove_column :rooms, :users_count, :integer
  end
end
