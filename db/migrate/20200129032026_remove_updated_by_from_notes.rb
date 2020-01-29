class RemoveUpdatedByFromNotes < ActiveRecord::Migration[5.0]
  def change
    remove_column :notes, :updated_by, :integer
  end
end
