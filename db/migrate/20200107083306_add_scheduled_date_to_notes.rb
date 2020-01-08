class AddScheduledDateToNotes < ActiveRecord::Migration[5.0]
  def change
    add_column :notes, :scheduled_date, :datetime
  end
end
