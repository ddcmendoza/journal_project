require 'rails_helper'

RSpec.describe User, type: :model do
  context 'validations' do
    subject{ User.new(username: "TestAcc",password: "1234")}
    it { validate_uniqueness_of :username }

    it { expect(described_class.new).to validate_presence_of :username }
    it { expect(described_class.new).to validate_presence_of :password_digest }
  end

end