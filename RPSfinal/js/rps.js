//Sean Hardin's rock paper scissors Javascript application.
//hide the other sections from user at the start.
var gameScreen = document.getElementById("gameScreen");
var gameOverScreen = document.getElementById("gameOver");

//run when player clicks on start to hide start screen and show game screen.
function startGame(){
	document.getElementById("startScreen").style.display = "none";
	gameScreen.style.display = "block";
}
document.getElementById("startButton").onclick = startGame;

//these elements see a lot of use, so initializing them early.
var rockImg = document.getElementById("rock");
var paperImg = document.getElementById("paper");
var scissorsImg = document.getElementById("scissors");
var computerRockImg = document.getElementById("crock");
var computerPaperImg = document.getElementById("cpaper");
var computerScissorsImg = document.getElementById("cscissors");
var round = 1;
//P at end denotes paragraph tag
var roundP = document.getElementById("round");
var playerP = document.getElementById("player");
var computerP = document.getElementById("computer");
var winnerP = document.getElementById("winner");
var scoreP = document.getElementById("score");
const moves = ["rock", "paper", "scissors"];

//main game loop. runs when player clicks an image, with move being whichever image was clicked.
function selected(move){
	//disable listeners so player can actually see results.
	removeImgListeners();
	//computer making choice.
	var computerChoice = Math.floor(Math.random() * 3);
	var compMove = moves[computerChoice];
	//edit the displayed elements to show results
	roundP.innerHTML = "Results of Round " + round + ":";
	playerP.innerHTML = "Player chose: " + move;
	computerP.innerHTML = "Computer chose: " + compMove;
	//nested switch blocks to account for all 9 possible cases.
	switch(compMove){
		case "rock":
			//change the image of the computer's move to show selection
			computerRockImg.src = "img/rs.png";
			switch(move){
				case "rock":
					//offload scorekeeping to other functions.
					draw();
					//update winner based on which of the 9 cases is hit.
					winnerP.innerHTML = "Draw, nobody gets a point.";
					break;
				case "paper":
					win();
					winnerP.innerHTML = "Player wins, paper beats rock!";
					break;
				case "scissors":
					loss();
					winnerP.innerHTML = "Player loses, rock beats scissors.";
					break;
				default:
					//this should be unreachable code.
					console.log("seeing this means intentionally sending a faulty value into this function.");
			}
			break;
		case "paper":
			computerPaperImg.src = "img/ps.png";
			switch(move){
				case "rock":
					loss();
					winnerP.innerHTML = "Player loses, paper beats rock.";
					break;
				case "paper":
					draw();
					winnerP.innerHTML = "Draw, nobody gets a point.";
					break;
				case "scissors":
					win();
					winnerP.innerHTML = "Player wins, scissors beat paper!";
					break;
				default:
					console.log("seeing this means intentionally sending a faulty value into this function.");
			}
			break;
		case "scissors":
			computerScissorsImg.src = "img/ss.png";
			switch(move){
				case "rock":
					win();
					winnerP.innerHTML = "Player wins, rock beats scissors!";
					break;
				case "paper":
					loss();
					winnerP.innerHTML = "Player loses, scissors beat paper.";
					break;
				case "scissors":
					draw();
					winnerP.innerHTML = "Draw, nobody gets a point.";
					break;
				default:
					console.log("seeing this means intentionally sending a faulty value into this function.");
			}
			break;
		default:
			console.log("this code should be impossible to reach.");
	}
	//give the player 2 seconds to see the results before moving on to the next round.
	//can be changed to 0 to just let player go through rounds as fast as they can click.
	setTimeout(endRound, 2000);
}

//scorekeeping functions, increment respective total and change respective span within winnerP element.
var wins = 0;
function win(){
	wins++;
	scoreP.childNodes[0].innerHTML = "Player: " + wins + " &nbsp;&nbsp;&nbsp;";
}

var losses = 0;
function loss(){
	losses++;
	scoreP.childNodes[1].innerHTML = "Computer: " + losses + " &nbsp;&nbsp;&nbsp;";
}

var draws = 0;
function draw(){
	draws++;
	scoreP.childNodes[2].innerHTML = "Draws: " + draws;
}

//sets up the next round, or if it is the 10th round, goes to game over screen.
function endRound(){
	if (round < 10){
		playerP.innerHTML = "Player chose:";
		computerP.innerHTML = "Computer chose:";
		winnerP.innerHTML = "Waiting for selection";
		round++;
		roundP.innerHTML = "Round " + round + ":";
		rockHoverOff();
		paperHoverOff();
		scissorsHoverOff();
		computerRockImg.src = "img/r.png";
		computerPaperImg.src = "img/p.png";
		computerScissorsImg.src = "img/s.png";
		attachImgListeners();
	} else {
		var endMessage = document.getElementById("endMsg");
		//set up game over with round data.
		if (wins > losses){
			//humanity wins~
			endMessage.innerHTML = "Humanity has won against the robots! Good work!";
		} else if (wins < losses){
			//robot takeover
			endMessage.innerHTML = "The robots have just won the rights to control us all, humanity may be doomed...";
		} else {
			//the fight continues
			endMessage.innerHTML = "Neither side has emerged victorious, may the fight between humans and robots continue on!";
		}
		gameScreen.style.display = "none";
		gameOverScreen.style.display = "block";
	}
}

//creating function for each event so they can be disabled and re-enabled easily.
//general format:
//Hover - when mouse rolls over change to a light blue to signify being selectable
//HoverOff - when mouse rolls off, change back to neutral image
//Click - when clicked, change image to dark blue to signify selecting it, and run the selected function
//  with the value respective of the image clicked, being "rock", "paper", or "scissors"
function rockHover(){rockImg.src = "img/rh.png"}
function rockHoverOff(){rockImg.src = "img/r.png"}
function rockClick(){rockImg.src = "img/rs.png";selected("rock");}
function paperHover(){paperImg.src = "img/ph.png"}
function paperHoverOff(){paperImg.src = "img/p.png"}
function paperClick(){paperImg.src = "img/ps.png";selected("paper");}
function scissorsHover(){scissorsImg.src = "img/sh.png"}
function scissorsHoverOff(){scissorsImg.src = "img/s.png"}
function scissorsClick(){scissorsImg.src = "img/ss.png";selected("scissors");}

//removing all the image listeners so it doesn't change the state during results screen.
//there should be a more elegant way to remove these, but this was the easiest way i could find.
function removeImgListeners(){
	rockImg.onmouseover = '';
	rockImg.onmouseout = '';
	rockImg.onclick = '';
	paperImg.onmouseover = '';
	paperImg.onmouseout = '';
	paperImg.onclick = '';
	scissorsImg.onmouseover = '';
	scissorsImg.onmouseout = '';
	scissorsImg.onclick = '';
}

//attaching a whole bunch of listeners for changing the image, also make selection on click.
function attachImgListeners(){
	rockImg.onmouseover = rockHover;
	rockImg.onmouseout = rockHoverOff;
	rockImg.onclick = rockClick;
	paperImg.onmouseover = paperHover;
	paperImg.onmouseout = paperHoverOff;
	paperImg.onclick = paperClick;
	scissorsImg.onmouseover = scissorsHover;
	scissorsImg.onmouseout = scissorsHoverOff;
	scissorsImg.onclick = scissorsClick;
}
//initial state will have the listeners, so call it once at the start.
attachImgListeners();