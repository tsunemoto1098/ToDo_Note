class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable
  has_many :user_groups
  has_many :groups, through: :user_groups
  has_many :notes

  validates :name,
    length: { minimum: 1, maximum: 10 }
end
