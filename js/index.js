var giphyAPI = "http://api.giphy.com/v1/gifs/random?api_key=dc6zaTOxFJmzC&tag="
var gifHeights = [,];

function Idea(){
  var things = [['cloud service', 'the new silk road', 'golf cart', 'prothstetic arm', 'doorbell', 'distributed database','shirt','shoe insole', 'a turker', 'GoPro camera', 'bicycle helmet'], 
                ['beer coaster','distributed database', 'pant','Bitcoin','frat guy','air conditioner','wallet', 'barista', 'shoe insole','baby monitor', 'pug', "45'", 'your closet']];
  var connectors = ['talks to', 'mines','talks to', 'push messages', 'indexes', 'interfaces with', 'has an API for', 'predicts', 'listens for']; 
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

  $('#magic img').remove();
  var idea = new Idea();
 
  $("#quote h3").first().text(idea.phrase);
  $('.twitter-share-button').attr('data-text', '"' + idea.phrase + '" And more from the future of #IoT at ');

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
      console.log(gifHeights)
      console.log(shortest)
      $("img.giphy").css('max-height',shortest);

    });
  });
}

$(document).ready(function() {
  entertain();
  $(".go-btn").click(entertain);
});