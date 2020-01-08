class AddScheduledTimeToNote < ActiveRecord::Migration[5.0]
  def change
    add_column :notes, :scheduled_time, :datetime
  end
end
