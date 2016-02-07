var things = [['cloud service','distributed database','wearable shirt','shoe insole'], ['cloud service', 'beer coaster','distributed database','wearable shirt','Bitcoin','frat guy','air conditioner','wallet', 'shoe insole']];
var connectors = ['talks to', 'mines', 'turks','talks to', 'push messages', 'indexes', 'interfaces with', 'that has an API for', 'predicts'];

function randomThing(arr){
	return arr[Math.floor(Math.random()* arr.length)];
 }

function ideate(){
	return {
		thing1 : randomThing(things[0]),	
		thing2 : randomThing(things[1]),
		connector : randomThing(connectors)
	};
}

function phraseIt(idea){
	return "It's a " + idea.thing1 + " that "  + idea.connector + " " + idea.thing2 + "s.";
}

console.log(phraseIt(ideate()));
