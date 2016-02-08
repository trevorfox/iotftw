var giphyAPI = "http://api.giphy.com/v1/gifs/random?api_key=dc6zaTOxFJmzC&tag="
var gifHeights = [,];
var firstIdea = true;

function Idea(){
  var things = [['cloud service', 'the new silk road', 'golf cart', 'prothstetic arm', 'doorbell', 'distributed database','shirt','shoe insole', 'turker', 'GoPro camera', 'bicycle helmet'], 
                ['beer coaster','distributed database', 'pant','Bitcoin','frat guy','air conditioner','wallet', 'barista', 'shoe insole','baby monitor', 'pug', "45'", 'your closet']];
  var connectors = ['talks to', 'data mines','talks to', 'push messages', 'indexes', 'interfaces with', 'has an API for', 'predicts', 'listens for']; 
  this.randomThing = function(arr){
    return arr[Math.floor(Math.random()* arr.length)];
  }
  this.thing1 = this.randomThing(things[0]);
  this.thing2 = this.randomThing(things[1]);
  this.thingSearch1 = this.thing1.split(' ').join('+');
  this.thingSearch2 = this.thing2.split(' ').join('+');
  this.connector = this.randomThing(connectors);
  this.phrase = "It's a " + this.thing1 + " that "  + this.connector + " " + this.thing2 + "s.";
}

function getCatGif(index){  
  $.getJSON(giphyAPI + "lolcat", function(giphy) {
    var gifSrc = giphy.data.image_url; 
    $('#magic').append('<img class="giphy" src="' + gifSrc + '"/>');
    gifHeights[index] = Number(giphy.data.image_height);
  });
}

function entertain(){

  var idea = new Idea();
  $("#quote h3").first().text(idea.phrase);

  if (!firstIdea){
    $('#magic img').remove();
    $("#social").empty();
  }

  firstIdea = false;

  // load two gifs that hopefully have something to do with the idea

  $.getJSON(giphyAPI + idea.thingSearch1, function(giphy1) {
    if( giphy1.data.image_url !== undefined){
      $('#magic').append('<img class="giphy" src="' + giphy1.data.image_url + '"/>');
      gifHeights[0] = Number(giphy1.data.image_height);
    }  else {
      getCatGif(0);
    }

    $.getJSON(giphyAPI + idea.thingSearch2, function(giphy2) {
        if( giphy2.data.image_url !== undefined){
          $('#magic').append('<img class="giphy" src="' + giphy2.data.image_url + '"/>');
          gifHeights[1] = Number(giphy2.data.image_height);
        }  else {
          getCatGif(1);
      }
      
      // determine shortest gif height and set both gifs to that height

      var shortest = Math.min.apply(null, gifHeights);
      $("img.giphy").css('max-height',shortest);
    });
  });

  // refresh the tweet button

  twttr.ready(function (twttr) {
    twttr.widgets.createShareButton(
      document.URL,
      document.getElementById('social'),
      { 
        size: "large",
        text: '"' + idea.phrase + '" And more from the future of #IoT at ',
        related: "realtrevorfaux",
        hashtags: "IoTftw"
      }
    );
  });
  
  // GTM event

  dataLayer.push({
    event: 'ideate',
    idea : idea
  });
}

$(document).ready(function() {
  entertain();
  $(".go-btn").click(entertain);
});