class AddTaskIdToTasks < ActiveRecord::Migration[6.1]
  def change
    add_column :tasks, :task_id, :integer
  end
end
