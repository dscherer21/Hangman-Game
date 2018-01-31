var matrixArray = ["MR ANDERSON", "THERE IS NO SPOON", "AGENT SMITH", "MORPHEUS", "THE MATRIX IS ALL AROUND US","TRINITY", "FREE YOUR MIND NEO", "SEIFER", "DIGITAL PIMP HARD AT WORK"];
console.log(matrixArray);

window.onload = function() {
    document.getElementById("myAudio").play();
}

//game starts on window load

//computer generates a random phrase from the matrixArray and displays it as blanks in the game field.
function getMessage() {
    return matrixArray[Math.floor(Math.random() * matrixArray.length)];
 }
 console.log(getMessage);

//Whenever the user types a letter, the computer checks to see if it is the phrase and changes the blanks in the phrase when it does.

//whenever the user guesses a letter that is not in the word, display it in the guesses field

// after 8 wrong guess the user adds a point losses and the game resets

//if the user guesses all the letters in the phrase the player adds a point to wins and the game resets
