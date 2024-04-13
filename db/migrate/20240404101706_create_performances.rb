class CreatePerformances < ActiveRecord::Migration[6.1]
  def change
    create_table :performances do |t|
      t.string :title
      t.string :video
      t.string :audio

      t.timestamps
    end
  end
end
