class CreateHappyMoments < ActiveRecord::Migration
  def change
    create_table :happy_moments do |t|
      t.string :content
      t.string :lat
      t.string :lon

      t.timestamps
    end
  end
end
