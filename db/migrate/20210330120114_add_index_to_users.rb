class AddIndexToUsers < ActiveRecord::Migration[6.1]
  def change
    add_index :tasks, :category_id
    add_index :tasks, :user_id
    add_index :tasks, :id
    add_index :categories, :user_id
    add_index :categories, :id
    add_index :users, :id
    #Ex:- add_index("admin_users", "username")
    #Ex:- add_index("admin_users", "username")
  end
end
