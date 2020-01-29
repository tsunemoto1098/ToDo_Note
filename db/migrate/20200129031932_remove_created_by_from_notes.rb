class RemoveCreatedByFromNotes < ActiveRecord::Migration[5.0]
  def change
    remove_column :notes, :created_by, :integer
  end
end
