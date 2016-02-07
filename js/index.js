var giphyAPI = "http://api.giphy.com/v1/gifs/random?api_key=dc6zaTOxFJmzC&tag="

function Idea(){
  var things = [['cloud service','distributed database','wearable shirt','shoe insole'], 
                ['cloud service', 'beer coaster','distributed database','wearable shirt','Bitcoin','frat guy','air conditioner','wallet', 'shoe insole']];
  var connectors = ['talks to', 'mines', 'turks','talks to', 'push messages', 'indexes', 'interfaces with', 'that has an API for', 'predicts'];
  
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

function entertain(){

  var idea = new Idea();
  console.log(idea.thing1)
  console.log(idea.thing2)
  
  $("#magic h3").first().text(idea.phrase);

  $.getJSON(giphyAPI + idea.searchString1, function(giphy) {
    var gifsrc = giphy.data.image_url  // SOLVE BROKEN IMAGE PROBLEM
    $('#magic').prepend('<img class="giphy" src="' + gifsrc + '"/>')
  });

  $.getJSON(giphyAPI + idea.searchString2, function(giphy) {
    var gifsrc = giphy.data.image_url  // SOLVE BROKEN IMAGE PROBLEM
    $('#magic').prepend('<img class="giphy" src="' + gifsrc + '"/>')
  });

}

$(document).ready(function() {
  $('magic img').remove();
  $(".go-btn").click(entertain);
});