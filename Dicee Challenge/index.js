var dice1Pic = document.querySelector(".img1");
var dice2Pic = document.querySelector(".img2");
var diceNumber1 = ranNumber();
var diceNumber2 = ranNumber();
var winPlayer =


// adding random images
dice1Pic.src="images/dice"+diceNumber1+".png";
dice2Pic.src="images/dice"+diceNumber2+".png";


// condiction
if (diceNumber1 > diceNumber2) {

  document.querySelector("h1").innerText="Player1 Wins!"
}
else if (diceNumber1 < diceNumber2) {
  document.querySelector("h1").innerText="Player2 Wins!"
} else {
  document.querySelector("h1").innerText="Draw!"
}

// creating random number
function ranNumber(){
  let random=Math.floor(Math.random() * 6)+1;
  return random;
}
