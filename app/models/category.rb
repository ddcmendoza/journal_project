class Category < ApplicationRecord
    validates :name, presence: true
    validates :name, length: {minimum: 2}
    validates :name, length: {maximum: 45}
    has_many :tasks
    belongs_to :user

end
