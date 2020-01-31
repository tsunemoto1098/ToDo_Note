class Group < ApplicationRecord
  has_many :user_groups, dependent: :destroy
  has_many :users, through: :user_groups
  has_many :notes, dependent: :destroy

  validates :name, presence: true, uniqueness: false
  validates :name, length: { minimum: 1, maximum: 10 }

  records_with_operator_on :create, :update
  
  def show_last_note
    if (last_note = notes.last).present?
      last_note.text? ? last_note.text : '画像'
    else
      'まだメモがありません'
    end
  end

end