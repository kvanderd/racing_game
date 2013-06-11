

function Game(id) {
   this.id = id;
}

Game.prototype.findLocation = function(player)
{
  var location = $(player).find('td.active');
  console.log(this.checkWinner(player, location['selector']));
  if(this.checkWinner(player, location['selector']) === true)
  {
    this.declareWinner(player)
  } else
  {
    this.render(location)
  }
};

Game.prototype.render = function(location) {
  var next_cell = $(location['selector']).next();
  $(location['selector']).removeClass('active');
  next_cell.addClass('active');

};

Game.prototype.Keystroke = function(e, player_1, player_2) {
  if (e.keyCode==="A".charCodeAt(0)) {
    this.findLocation(player_1);
  } else if (e.keyCode==="B".charCodeAt(0)) {
    this.findLocation(player_2);
  }
};


Game.prototype.checkWinner = function(player, location) {
  var next_cell = $(location).next();
  if(next_cell.length === 0 )
  {
    return true;
  }
  else
  {
    return false;
  }
};

Game.prototype.declareWinner = function(player){
  var winnerName = $(player['selector']).attr('class');
  console.log(winnerName);
  $('table').replaceWith('Getting Results');
  this.postResults(winnerName);
};

Game.prototype.postResults = function(winnerName){
  $.ajax ({
    method: 'POST',
    url: '/game/'+ $('.game_id').attr('id'),
    data: { 'winner' : winnerName}
    }).done(function(response){
      console.log(response);
      $('body').replaceWith(response);
    });
};
