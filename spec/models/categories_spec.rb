require 'rails_helper'

RSpec.describe Category, type: :model do
    context 'validations' do
        it { expect(described_class.new).to validate_presence_of :name }
    end
    context 'associations' do
        it {should belong_to(:user)}
    end

end