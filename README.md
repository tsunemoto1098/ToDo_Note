# README


# ToDo_Note　DB設計


## usersテーブル
|Column  |Type   |Options|
|--------|-------|-------|
|id      |integer|null: false, foreign_key: true|
|name    |string |null: false|
|email   |string |null: false|
|password|string |null: false|
### Association
- has_many :notes, dependent: :destroy
- has_many :groups, through: :users_groups
- has_many :users_groups



## groupsテーブル
|Column  |Type   |Options|
|--------|-------|-------|
|id      |integer|null: false, foreign_key: true|
|name    |string |null: false|
### Association
- has_many :notes
- has_many :users, through: :uses_groups
- has_many :users_groups



## users_groupsテーブル
|Column  |Type   |Options|
|--------|-------|-------|
|user_id |integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|
### Association
- belongs_to :user
- belongs_to :group



## notesテーブル
|Column  |Type   |Options|
|--------|-------|-------|
|id      |integer|null: false, foreign_key: true|
|text    |text   |       |
|image   |text   |       |
|user_id |integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|
### Association
- belongs_to :user
- belongs_to :group

