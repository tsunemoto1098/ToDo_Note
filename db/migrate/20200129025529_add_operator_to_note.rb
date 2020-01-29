class AddOperatorToNote < ActiveRecord::Migration[5.0]
  def change
    add_column :notes, :created_by, :integer
    add_column :notes, :updated_by, :integer
  end
end
