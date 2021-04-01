
class User < ApplicationRecord
    has_secure_password
    validates :username, presence: true
    validates :username, uniqueness: true
    validates :username, length: {minimum: 4}
    validates :username, length: {maximum: 32}
    #validates :password_digest, presence: true
    #validate :password_must_exist
    has_many  :tasks
    has_many :categories

    # def password_must_exist
    #     if !(:password_digest)
    #         validates :password, length: {minimum: 6}
    #         validates :password, length: {maximum: 32}
    #     end
    # end
end

