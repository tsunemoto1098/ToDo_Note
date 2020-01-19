class AddScheduledTimeToNotes < ActiveRecord::Migration[5.0]
  def change
    add_column :notes, :scheduled_time, :integer
  end
end
