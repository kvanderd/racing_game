$('document').ready(function(){

  $(document).on('keyup', function(event) {
    var player1 = $('#player1');
    var player2 = $('#player2');
    // console.log(player1);
    if(event.keyCode == 65)
    {
      moveCar(player1);
    }
    else if (event.keyCode == 76)
    {
      moveCar(player2);
    }
    else
    {
      console.log('you can\'t use that key');
    }
  });

  function parseWinner(winner){
    var winnerName = $('#' + winner).attr('class');
    return winnerName;
  }

  function postResults(winner){
    $.ajax({
      method: 'POST',
      url: '/game/'+ $('.game_id').attr('id'),
      data: { 'winner': winner}
  }).done(function(response){
    console.log(response);
    $('.container').replaceWith(response);
  });
  }

  function moveCar(player) {
    // console.log(player);
    var current_cell = $(player).find('td.active');
    var next_cell = current_cell.next();
    current_cell.removeClass('active');
    if (next_cell.length === 0)
      {
        var winner = next_cell['prevObject'][0]['parentElement']['id'];
        var winnerName = parseWinner(winner);
        $('table').replaceWith('Getting Results');
        postResults(winnerName);
      }
      else
      {
        next_cell.addClass('active');
      }
  }
});
