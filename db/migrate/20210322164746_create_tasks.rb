class CreateTasks < ActiveRecord::Migration[6.1]
  def self.up
    create_table :tasks do |t|
      t.string :name, null:false
      t.string :details
      t.datetime :deadline, precision: 6
      t.integer :category_id
      t.integer :user_id

      t.timestamps
    end
    create_table :categories do |t|
        t.string :name, null:false
        t.string :details
        t.integer :user_id
  
        t.timestamps
      end
      create_table :users do |t|
        t.string :username, null:false
        t.string :name
        t.string :password, null:false
  
        t.timestamps
      end
  end
  def self.down
    drop_table :tasks
    drop_table :categories
  end
end
