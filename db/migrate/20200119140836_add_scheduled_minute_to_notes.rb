class AddScheduledMinuteToNotes < ActiveRecord::Migration[5.0]
  def change
    add_column :notes, :scheduled_minute, :integer
  end
end
