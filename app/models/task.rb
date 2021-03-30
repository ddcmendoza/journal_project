class Task < ApplicationRecord
    validates :name, presence: true
    belongs_to :category
    belongs_to :user
    validate :deadline_after_now

    def deadline_after_now
        return if deadline.blank?
        if deadline < Time.now
            errors.add(:deadline, "Must be after today!")
        end
    end


end
