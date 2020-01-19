class RemoveScheduledTimeToNotes < ActiveRecord::Migration[5.0]
  def change
    remove_column :notes, :scheduled_time, :string
  end
end
