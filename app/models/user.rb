
class User < ApplicationRecord
    has_secure_password
    validates :username, presence: true
    validates :username, uniqueness: true
    validates :username, length: {minimum: 4}
    validates :username, length: {maximum: 32}
    validates :password_digest, presence: true
    has_many  :tasks
    has_many :categories

end

