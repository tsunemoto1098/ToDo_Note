class AddOperatorToGroup < ActiveRecord::Migration[5.0]
  def change
    add_column :groups, :created_by, :integer
    add_column :groups, :updated_by, :integer
  end
end
