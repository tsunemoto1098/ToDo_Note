class Group < ApplicationRecord
  has_many :user_groups
  has_many :users, through: :user_groups
  has_many :notes
  validates :name, presence: true, uniqueness: true

  def show_last_note
    if (last_note = notes.last).present?
      last_note.text? ? last_note.text : '画像'
    else
      'まだメモがありません'
    end
  end

end
