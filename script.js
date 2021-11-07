'use strict';

const minValue = 1;
const maxValue = 20;
let secretNumber = Math.trunc(Math.random() * maxValue) + 1;
let score = maxValue;
let highScore = 0;

const displayMessage = function (message) {
    document.querySelector('.message').textContent = message;
};
const displayScore = function (score) {
    document.querySelector('.score').textContent = score;
};

const checkNumber = function () {
    const guess = Number(document.querySelector('.guess').value);

    // check the value for no input
    if (!guess) {
        displayMessage('No number! ⛔');

        // check for value within the game range
    } else if (guess < minValue || guess > maxValue) {
        displayMessage(`Please enter a number between ${minValue} and ${maxValue}`);

        // win
    } else if (guess === secretNumber) {
        displayMessage('Correct number! 🎉');
        document.querySelector('body').style.backgroundColor = '#60b347';
        document.querySelector('.number').style.width = '30rem';
        document.querySelector('.number').textContent = secretNumber;
        if (score > highScore) {
            highScore = score;
            document.querySelector('.highscore').textContent = highScore;
        }

        // guess is wrong
    } else if (guess !== secretNumber) {
        if (score > 1) {
            displayMessage(guess > secretNumber ? 'Too high 🔼!' : 'Too low 🔽!');
            score--;
            displayScore(score);
        } else {
            displayMessage('You lost the game. 😢 Better luck next time!');
            displayScore(0);
        }
    }
}

// resetting the 'again' btn
document.querySelector('.again').addEventListener('click', function () {
    score = maxValue;
    secretNumber = Math.trunc(Math.random() * maxValue) + 1;
    displayScore(score);
    document.querySelector('body').style.backgroundColor = '#222';
    document.querySelector('.number').style.width = '15rem';
    document.querySelector('.number').textContent = '?';
    displayMessage('Start guessing...');
    document.querySelector('.guess').value = ''; // value. Not textContent
});

// check button click and "Enter" key
document.querySelector('.check').addEventListener('click', checkNumber);
const enterCheck = document.querySelector('.guess');
enterCheck.onkeydown = function (keydown) {
    if (keydown.key === 'Enter') {
        checkNumber();
    }
}

