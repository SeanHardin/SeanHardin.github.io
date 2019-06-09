/*Just as a fair warning, I have a bit of experience playing around with Javascript from before
this class.
*/

//converting the nodeList into a plain array so i can use .indexOf();
var htmlCells = [];
document.querySelectorAll(".cell").forEach(function(item){htmlCells.push(item)});

//generating a map of the game which the user isn't shown
var gameMap = [];
for (var i=0;i<htmlCells.length;i++){
	gameMap.push(0);
	//adding a listener to each node to fill the target by clicking on them
	htmlCells[i].onclick = function(){guessInput.value = htmlCells.indexOf(this) + 1;};
}
//consts set up here so they can be modified to create a unique experience.
const SHIPSIZE = 3;
const MAXGUESSES = 6;

var guessNumber = 0;
var guessLocation;
var shipHealth = SHIPSIZE;


//generate random between 0 and the last possible space the ship can start in.
var rand = Math.random();
rand *= (htmlCells.length - SHIPSIZE + 1);
rand = Math.floor(rand);

//'placing' ship in the spaces
for(var i=0;i<SHIPSIZE;i++){
	gameMap[rand + i] = 1;
}

//initializing the status and writing a function to write messages to it more quickly
var gameStatus = document.getElementById("status");
function updateStatus(msg){
	gameStatus.innerHTML = msg;
}
//initializing the other fields in the status
var guessInput = document.getElementById("target");
var shotsRemaining = document.getElementById("shots");
shotsRemaining.innerHTML = "Shots remaining: " + (MAXGUESSES - guessNumber) + "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; target to shoot: ";

//main function that gets run when user clicks on the shoot button.
//stops if over guess limit or already won
//checks if hit,miss, or duplicate and responds accordingly.
function guess(){
	//back out if it shouldn't be called again.
	if (guessNumber >= MAXGUESSES || shipHealth <= 0){
		return;
	}
	guessNumber++;
	guessLocation = guessInput.value;
	//validating the input
	if (isNaN(guessLocation) || guessLocation < 1 || guessLocation > htmlCells.length){
		updateStatus("Invalid input. input a number between 1 and " + htmlCells.length + " and try again.");
	} else {
		//input is valid, checking with stored location.
		if (gameMap[guessLocation - 1] == 1){
			//hit, takes off health, sets position as already shot, changes the cell to show damage, updates status.
			shipHealth--;
			gameMap[guessLocation - 1] = -1;
			htmlCells[guessLocation - 1].classList.add("hit");
			htmlCells[guessLocation - 1].innerHTML = '&nbsp;X'
			updateStatus("Good work, you just need to damage " + shipHealth + " more locations to destroy the enemy battleship.");
		} else if (gameMap[guessLocation - 1] == 0){
			//miss, set position as already shot, marks cell to show this change, updates status.
			gameMap[guessLocation - 1] = -1;
			htmlCells[guessLocation - 1].innerHTML = '--';
			updateStatus("No dice, keep on searching.");
		} else {
			//duplicate, updates status to tell user they just shot the same spot twice.
			updateStatus("What are you doing!? you already shot that location!");
		}
		//updates the shots remaining part of the status every shot.
		shotsRemaining.innerHTML = "Shots remaining: " + (MAXGUESSES - guessNumber) + "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; target to shoot: ";
	}
	//if the user runs out of guesses, this is displayed
	if (guessNumber >= MAXGUESSES){
		updateStatus("We've failed to destroy the battleship and can only depend on their mercy to survive.");
	}
	//if the ship is killed, this is displayed. this runs after loss to overwrite it in case the final guess destroys the ship.
	if (shipHealth <= 0){
		updateStatus("Good work! you've destroyed their battleship with " + (MAXGUESSES - guessNumber) + " shots left!");
	}
};

//listen for clicking the shoot button.
document.getElementById("shoot").onclick = guess;