function menuDrop () {
  $(".topGames").click(function(){
    $(".fa-arrow-circle-down").toggleClass("iconRotate");
    $(".menuContainer").toggleClass("menuOpen");
    $(".mainContainer").toggleClass("mainOpen");
  });
}

function getGames() {
  $.ajax({
    method: "GET",
    url: "https://api.twitch.tv/kraken/games/top",
    headers: {
      "Client-ID": "g0yy7wimbymfcnmott7o2dgatvwnbwn"
    },
    success: function (data) {
      for (var i = 0; i < data.top.length; i++){
      $(".gamesMenu").append("<li class='listGame'><img src='" + data.top[i].game.box.medium + "'></br>" + data.top[i].game.name + "</br>Viewers: " + data.top[i].viewers);
      }
      console.log(data);
    }
  });
}

function player() {
  var options = {
        width: 854,
        height: 480,
        channel: "{CHANNEL}",
        //video: "{VIDEO_ID}"
    };
    var player = new Twitch.Player("{PLAYER_DIV_ID}", options);
    player.setVolume(0.5);
}

$(document).ready(function() {
  menuDrop();
  getGames();
});
