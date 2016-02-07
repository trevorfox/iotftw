var THIS, THAT, BASICALLY, GIFSRC;
var startupAPI = "http://itsthisforthat.com/api.php?call=entertain&callback=?"
var giphyAPI = "http://api.giphy.com/v1/gifs/random?api_key=dc6zaTOxFJmzC&tag="

function entertain(data) {
  THIS = data['this'];
  THAT = data['that'];
  BASICALLY = "It's like " + THIS + " for " + THAT
  $("#magic h3").first().text(BASICALLY);
  console.log("start")
  var searchString = THIS.split(" ").join("+");
  console.log(searchString)
  var giphy = $.getJSON(giphyAPI + searchString, function(data) {
    console.log(searchString);
    GIFSRC = data.data.image_url  // SOLVE BROKEN IMAGE PROBLEM
    console.log(GIFSRC);
    $('#magic').prepend('<img id="theImg" src="' + GIFSRC + '"/>')
  });
}

$(document).ready(function() {
  $(".go-btn").click(function() {
    var startup = $.getJSON(startupAPI, function(data) {
      console.log("startup");
    });
  });
});