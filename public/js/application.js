$(document).ready(function() {
  $('.start').on('click', function() {

    game = new Game($('.game_id').attr('id'));
    player_1 = new Player('#player1');
    player_2 = new Player('#player2');
    $(document).on('keyup', function(e) {
      game.Keystroke(e, player_1, player_2);
    });
  });
});
