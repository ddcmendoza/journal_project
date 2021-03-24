require "test_helper"

class CategoryTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
  test "should not save category without name" do
    category = Category.new
    category.details = 'give me details'
    assert_not category.save, "Saved the Category without name"
  end

  test "should save category name" do
    category = Category.new
    category.name = 'Default Category'
    assert category.save, "Failed to save name"
  end

  test "should save category without user_id" do
    category = Category.new
    category.details = 'give me details'
    category.name = 'Default name'
    assert category.save, "Unable to save category without user_id"
  end
  
end
