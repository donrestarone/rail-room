class AddSlugColumnToRoomsTable < ActiveRecord::Migration[5.2]
  def up
    add_column :rooms, :slug, :string
    add_index :rooms, :slug
  end

  def down
    remove_index(:rooms, column: :slug)
    remove_column :rooms, :slug, :string
  end
end
