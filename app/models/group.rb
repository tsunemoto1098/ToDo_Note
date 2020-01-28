class Group < ApplicationRecord
  has_many :user_groups, dependent: :destroy
  has_many :users, through: :user_groups
  has_many :notes, dependent: :destroy

  validates :name, presence: true, uniqueness: true
  validates :name, length: { minimum: 1, maximum: 10 }

  def show_last_note
    if (last_note = notes.last).present?
      last_note.text? ? last_note.text : '画像'
    else
      'まだメモがありません'
    end
  end

end