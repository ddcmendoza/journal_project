class User < ApplicationRecord
    has_secure_password
    validates :username, presence: true
    validates :username, uniqueness: true
    validates :username, length: {minimum: 4}
    validates :username, length: {maximum: 32}
    validates :password, presence: true
    validates :password, length: {minimum: 6}
    validates :password, length: {maximum: 32}
    has_many  :tasks
    has_many :categories
end

