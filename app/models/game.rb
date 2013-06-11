class Game < ActiveRecord::Base
  has_and_belongs_to_many :players
  validate :check_number_of_players


  private 

  def check_number_of_players
    if self.players.length != 2
      errors.add(:number_of_players, "must be 2")
    end
  end
end
