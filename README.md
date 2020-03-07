# README

## ToDo_Noteとは
ToDo管理 + チャット + 音楽
３つの機能がついたアプリ。

## 概要
* アプリ名：ToDo_Note
* 使用言語：HTML/CSS/Ruby/Rails/JavaScript/jQuery/MySQL/AWS/Github/Visual Studio Code
* 機能：ログイン機能、ToDoリストの作成、日にち、時間の登録、グループ分け機能、他のメンバーとの共有（チャット）、音楽再生機能

## 特徴
他のToDo管理アプリとの一番の違いは音楽再生できるところです。
好きな音源を設定することによってこのアプリを立ち上げるだけで音楽再生と予定確認等が同時に行えるので、あまり時間を使いたくない時でも気軽に音楽を再生できます。

## 作成理由
音楽アプリとToDo管理アプリを別々に起動せずに使えるアプリを作りたかったため。
また、仕事のスケジュール管理であっても楽しいものにしたいと思ったからです。

## 使い方
* 新規登録orログイン後、左のバーで新規Note作成する。
* 作成したNoteを選択し、文章、画像、日にち、時間の登録をする。（文章のみ、画像のみ登録も可）
* 不要な書き込みはゴミ箱アイコンをクリックすると削除できます。
* Note名の編集・削除はNote選択後に右のバーで行えます。
* 音楽再生はNote選択時、ページ下部に再生バーが表示されます。

## URL
### [http://52.199.77.122/](http://52.199.77.122/)
### sampleアカウント
* メール：sample@gmail.com
* パスワード: sample



# DB設計

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
|Column    |Type   |Options|
|----------|-------|-------|
|id        |integer|null: false, foreign_key: true|
|name      |string |null: false|
|created_by|integer|  |
|updated_by|integer|  |
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
|scheduled_date  |datetime|  |
|scheduled_time  |integer |  |
|scheduled_minute|integer |  |
### Association
- belongs_to :user
- belongs_to :group
