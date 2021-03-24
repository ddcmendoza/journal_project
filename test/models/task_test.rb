require "test_helper"

class TaskTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
  test "should not save task without name" do
    task = Task.new
    task.details = 'Default details'
    assert_not task.save, "Saved the Task without name"
  end
 
  test "should save task without user_id" do
    c = Category.new
    c.name = 'placeholder'
    c.save
    task = Task.new
    task.details = 'give me details'
    task.name = 'Default name'
    task.category_id = c.id
    assert task.save, "Unable to save task without user_id"
  end

  test "should not save task without category_id" do
    task = Task.new
    task.details = 'give me details'
    task.name = 'Default name'
    task.user_id = '1'
    assert_not task.save, "Save task without category_id"
  end

  test "should save task without details" do
    c = Category.new
    c.name = 'placeholder'
    c.save
    task = Task.new
    task.name = 'nameme'
    task.category_id = c.id
    assert task.save, "Unable to save the Task without details"
  end
end
