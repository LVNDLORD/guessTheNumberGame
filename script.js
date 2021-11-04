'use strict';

let secretNumber = Math.trunc(Math.random() * 20) + 1;
let score = 20;
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
    } else if (guess < 1 || guess > 20) {
        displayMessage('Please enter a number between 1 and 20');

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

    // resetting the 'again' btn
    document.querySelector('.again').addEventListener('click', function () {
        score = 20;
        secretNumber = Math.trunc(Math.random() * 20) + 1;
        displayScore(score);
        document.querySelector('body').style.backgroundColor = '#222';
        document.querySelector('.number').style.width = '15rem';
        document.querySelector('.number').textContent = '?';
        displayMessage('Start guessing...');
        document.querySelector('.guess').value = ''; // value. Not textContent
    });
}

// check button click and "Enter" key
document.querySelector('.check').addEventListener('click', checkNumber);

window.addEventListener('keydown', (e) => {
    if (e.code === 'Enter' || e.code === 'NumpadEnter') {
        checkNumber();
    }
});

