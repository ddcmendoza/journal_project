require "test_helper"

class UserTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
  test 'should not save User without username and password' do
    user = User.new
    assert_not user.save, "Saved the User without username and password"
  end
  test 'should not save User without password' do
    user = User.new
    user.name = 'Default name'
    assert_not user.save, "Saved the User without password"
  end
  test 'should not save User without username' do
    user = User.new
    user.password_digest = '123456'
    assert_not user.save, "Saved the User without username"
  end
  
end
