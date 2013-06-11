get '/' do
  # Look in app/views/index.erb
  erb :index
end

get '/games/new' do
  erb :'games/new_game'
end

post '/games' do 
  @game = Game.new
  player1 = Player.find_or_create_by_name(params[:game]["player1"])
  player2 = Player.find_or_create_by_name(params[:game]["player2"])
  @game.players << player1
  @game.players << player2
  if @game.save
    erb :'games/game_play'
  else
    @messages = @game.errors.messages
    erb :'games/new_game'
  end
end

get '/game/:id' do
   @game = Game.find(params[:id])
   erb :'games/report'

end

post '/game/:id' do
  @game = Game.find(params[:id])
  @game.winner = params['winner']
  @game.save
  erb :'games/win'
end
