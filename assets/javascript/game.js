//Bugs that need to be worked out:
//When a "Space Bar" space is entered the whole phrase reveals.
//Try to create a function that reveals empty spaces on phrase load.
//Some of the phrases will are not auto indenting at the end of the line and breaking up the words.
window.onload = function() {
    document.getElementById("myAudio").play();
}

(function () {
    "use strict";
    var availableLetters, words, guessInput, guess, guessButton, lettersGuessed, lettersMatched, output, man, letters, lives, currentPhrase, numLettersMatched, messages;

    function setup() {
        // start config options
        availableLetters = "abcdefghijklmnopqrstuvwxyz ";
        lives = 8;
        words = ["morpheus", "trinity", "cypher", "tank", "dozer", "mouse", "mr anderson", "agent smith", "the oracle", "there is no spoon", "free your mind neo", "digital pimp hard at work", "neo is the one", "the matrix is all around you"];
        messages = {
            win: 'You win! You must be The One!',
            lose: 'Game over! The Agents got to you!',
            guessed: ' already guessed, please try again...',
            validLetter: 'Please enter a letter from A-Z'
        };
        // end config options

        lettersGuessed = lettersMatched = '';
        numLettersMatched = 0;

        // choose a word 
        currentPhrase = words[Math.floor(Math.random() * words.length)];

        // make #man and #output blank, create vars for later access 
        output = document.getElementById("output");
        man = document.getElementById("man");
        guessInput = document.getElementById("letter");

        man.innerHTML = 'You have ' + lives + ' lives remaining';
        output.innerHTML = '';

        document.getElementById("letter").value = '';

        // make sure guess button is enabled 
        guessButton = document.getElementById("guess");
        guessInput.style.display = 'inline';
        guessButton.style.display = 'inline';

        //set up display of letters in current word 
        letters = document.getElementById("letters");
        letters.innerHTML = '<li class="current-phrase text-center">Current Phrase:</li>';
        //Bug I'm trying to fix: if .letter contains an empty space character, reveal that character on load.
        var letter, i;
        for (i = 0; i < currentPhrase.length; i++) {
            letter = '<li class="letter letter' + currentPhrase.charAt(i).toUpperCase() + '">' + currentPhrase.charAt(i).toUpperCase() + '</li>';
            letters.insertAdjacentHTML('beforeend', letter);
        }
    }

    function gameOver(win) {
        if (win) {
            output.innerHTML = messages.win;
            output.classList.add('win');
        } else {
            output.innerHTML = messages.lose;
            output.classList.add('error');
        }

        guessInput.style.display = guessButton.style.display = 'none';
        guessInput.value = '';
    }

    // Start game - should ideally check for existing functions attached to window.onload
    window.onload = setup();

    // buttons
    document.getElementById("restart").onclick = setup;

    // reset letter to guess on click
    guessInput.onclick = function () {
        this.value = '';
    };

    // main guess function when user clicks #guess
    document.getElementById('hangman').onsubmit = function (e) {
        if (e.preventDefault) e.preventDefault();
        output.innerHTML = '';
        output.classList.remove('error', 'warning');
        guess = guessInput.value;

        // does guess have a value? if yes continue, if no, error
        if (guess) {
            // is guess a valid letter? if so carry on, else error
            if (availableLetters.indexOf(guess) > -1) {
                // has it been guessed (missed or matched) already? if so, abandon & add notice
                if ((lettersMatched && lettersMatched.indexOf(guess) > -1) || (lettersGuessed && lettersGuessed.indexOf(guess) > -1)) {
                    output.innerHTML = '"' + guess.toUpperCase() + '"' + messages.guessed;
                    output.classList.add("warning");
                }
                // does guess exist in current word? if so, add to letters already matched, if final letter added, game over with win message
                else if (currentPhrase.indexOf(guess) > -1) {
                    var lettersToShow;
                    lettersToShow = document.querySelectorAll(".letter" + guess.toUpperCase());

                    for (var i = 0; i < lettersToShow.length; i++) {
                        lettersToShow[i].classList.add("correct");
                    }

                    // check to see if letter appears multiple times
                    for (var j = 0; j < currentPhrase.length; j++) {
                        if (currentPhrase.charAt(j) === guess) {
                            numLettersMatched += 1;
                        }
                    }

                    lettersMatched += guess;
                    //update this to not include spaces
                    if (numLettersMatched === currentPhrase.length) {
                        gameOver(true);
                    }
                }
                // guess doesn't exist in current word and hasn't been guessed before, add to lettersGuessed, reduce lives & update user
                else {
                    lettersGuessed += guess;
                    lives--;
                    man.innerHTML = 'You have ' + lives + ' lives remaining';
                    if (lives === 0) gameOver();
                }
            }
        }
        // no letter entered, error
        else {
            output.classList.add('error');
            output.innerHTML = messages.validLetter;
        }
        return false;
    };
}());
