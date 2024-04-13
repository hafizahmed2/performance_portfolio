class Performance < ApplicationRecord
  has_one_attached :video

  validates :title, presence: true
end
