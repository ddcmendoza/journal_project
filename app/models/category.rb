class Category < ApplicationRecord
    validates :name, presence: true
    validates :name, length: {minimum: 2}
    validates :name, length: {maximum: 45}
    has_many :tasks, dependent: :destroy
    belongs_to :user

end
