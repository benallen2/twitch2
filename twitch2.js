var gameArr = [];
var game = "League of Legends";
var listClick = "";
var streamersArr = [];
var streamClick = "";


function menuDrop () {
  $(".topGames").click(function(){
    $(".fa-arrow-circle-down").toggleClass("iconRotate");
    $(".menuContainer").toggleClass("menuOpen");
    $(".mainContainer").toggleClass("mainOpen");
    $("#main").toggleClass("col-xs-10");
    $("#main").toggleClass("col-xs-12");
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
      $(".gamesMenu").append("<li class='listGame' id='"+ i + "'><img src='" + data.top[i].game.box.medium + "'></br>" + data.top[i].game.name + "</br>Viewers: " + data.top[i].viewers);
      gameArr.push(data.top[i].game.name);

      }
      gameSelect();
      console.log(gameArr);
    }
  });
}

function gameSelect () {
  $(".listGame").click(function() {
    listClick = $(this).attr("id");
    game = gameArr[Number(listClick)];
    getStreams();
  });
}

function streamSelect () {
  $(".streamer").click(function() {
    streamClick = $(this).attr("streamer");
    streamer = streamersArr[Number(streamClick)];
    console.log(streamer);
    $("#streamVideo").empty();
    player();
    $("#currentName").html(streamer);
  });
}

var streamer = "Twitch";

function getStreams(){
  $.ajax({
    method: "GET",
    url: "https://api.twitch.tv/kraken/streams?game=" + game +"&limit=10",
    headers: {
      "Client-ID": "g0yy7wimbymfcnmott7o2dgatvwnbwn"
    },
    success: function (data) {
      $(".streamersList1").empty();
      $(".streamersList2").empty();
      for (var k = 0; k < data.streams.length; k++){
        streamersArr.push(data.streams[k].channel.name);
      }
      console.log(data);
      for(var i = 0; i < 5; i++){
        $(".streamersList1").append("<li class='streamer' streamer='" + i + "'><img src='" + data.streams[i].preview.small + "'></br>" + data.streams[i].channel.display_name + "</br> Playing: " + data.streams[i].game + "</br>Viewers: " + data.streams[i].viewers);
      }
      for(var j = 5; j < 10; j++){
        $(".streamersList2").append("<li class='streamer' streamer='" + j + "'><img src='" + data.streams[j].preview.small + "'></br>" + data.streams[j].channel.display_name + "</br> Playing: " + data.streams[j].game +  "</br>Viewers: " + data.streams[j].viewers);
      }
      streamSelect();
    }
  });
}




function player() {
  var options = {
        width: 854,
        height: 480,
        channel: "",
        //video: "{VIDEO_ID}"
    };
    var player = new Twitch.Player("streamVideo", options);
    player.setVolume(0);
    player.setChannel(streamer);
}

$(document).ready(function() {
  menuDrop();
  getGames();
  player();
});
