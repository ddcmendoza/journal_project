class Task < ApplicationRecord
    validates :name, presence: true
    validate :deadline_after_now
    
    belongs_to :category
    belongs_to :user

    def deadline_after_now
        return if deadline.blank?
        if deadline < Time.now
            errors.add(:deadline, "Must be after today!")
        end
    end


end
