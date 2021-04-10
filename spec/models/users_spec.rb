require 'rails_helper'

RSpec.describe User, type: :model do
  describe 'validations' do
    subject{ User.new(username: "TestAcc",password: "1234")}
    it { validate_uniqueness_of :username }

    it { expect(described_class.new).to validate_presence_of :username }
    it { expect(described_class.new).to validate_presence_of :password_digest }
    context "when the username is taken" do
      it "should not save the duplicate" do
        user1 =  FactoryBot.build(:user)
        user2 =  FactoryBot.build(:user)
        user1.save
        expect(user2.save).to be_falsy
      end
    end

  
  end
  

end