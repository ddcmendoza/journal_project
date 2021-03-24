class AddCategoryIdToCategories < ActiveRecord::Migration[6.1]
  def change
    add_column :categories, :category_id, :integer
  end
end
