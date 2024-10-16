console.log('Guitar Zeroes is working!');

const allKey = document.querySelectorAll(".keynote");
const resetButton = document.getElementById("resetButton");
const gameBoard = document.querySelector("#game-board");
const audio = document.getElementById("naive-music");
const startButton = document.getElementById("startButton");
const noteArray = [];
let score = 0;
let lives = 30;
let currentVelocity = 1;
let increasedVelocity = 5;

// Calculate positions relative to the game board width
function calculateGameBoardPositions() {
    const gameBoard = document.getElementById('game-board');
    const gameBoardWidth = gameBoard.offsetWidth;

    const positionsArr = [
        gameBoardWidth * 0.100,
        gameBoardWidth * 0.325,
        gameBoardWidth * 0.550,
        gameBoardWidth * 0.775,
    ];

    return positionsArr;
}


// Class section
class MusicNote {
    constructor() {
        this.width = 5;
        this.height = 5;
        this.color = 'black';
        const positionsArr = calculateGameBoardPositions();

        this.positionX = positionsArr[Math.floor(Math.random() * positionsArr.length)];
        this.positionY = 100;
        this.domElement = null;
        this.createDomElement();
        this.velocity = currentVelocity;
    }

    createDomElement() {
        this.domElement = document.createElement("div");
        this.domElement.className = "music-note";
        this.domElement.style.width = this.width + "vw";
        this.domElement.style.height = this.height + "vw";
        this.domElement.style.left = this.positionX + "px";
        this.domElement.style.bottom = this.positionY + "vh";
        this.domElement.style.position = "absolute";
        const note = document.getElementById("game-board");
        note.appendChild(this.domElement);
    }
    moveDown() {
        this.positionY -= this.velocity;
        this.domElement.style.bottom = this.positionY + "vh";
    }
}


// Interval section
let noteCreationInterval = setInterval(() => {
    noteArray.push(new MusicNote())

}, 1000);

let moveCreationInterval = setInterval(() => {
    noteArray.forEach((note, i) => {
        note.moveDown();
        //console.log(note);


        if (note.positionY < -5) {
            note.domElement.remove();
            noteArray.splice(i, 1);
            lives--;
            console.log(lives);
            gameOver()
        }
        updateScoreAndLives();
    })
}, 15);


// Game Over function
function gameOver() {
    if (lives <= 0) {
        clearInterval(moveCreationInterval);
        clearInterval(noteCreationInterval);
        alert("Game over! Strings broken.. Your final score is: " + score);
        audio.pause;
        audio.currentTime = 0;
    }
}

// Reset variable to restart game
function resetVariable() {
    noteArray.forEach(note => note.domElement.remove());
    noteArray.length = 0;
    lives = 30;
    score = 0;
    currentVelocity = 1;
    playSound;
    audio.currentTime = 0;
    updateScoreAndLives();
    clearInterval(moveCreationInterval);
    clearInterval(noteCreationInterval);

    noteCreationInterval = setInterval(() => {
        noteArray.push(new MusicNote())
    }, 1500);

    moveCreationInterval = setInterval(() => {
        noteArray.forEach((note, i) => {
            note.moveDown();
            if (note.positionY < -5) {
                note.domElement.remove();
                noteArray.splice(i, 1);
                lives--;
                gameOver()
            }
            updateScoreAndLives();
        })
    }, 15);
}


// Start button
const playSound = startButton.addEventListener("click", function () {
    audio.play();
    audio.currentTime = 0;
    audio.volume = 0.2;
    console.log("Music started");
});


// Reset button
resetButton.addEventListener("click", function () {
    resetVariable();
    playSound;
});

// Hide reset button
function hideResetButton() {
    resetButton.style.display = 'none';
}

// Show reset button
function showResetButton() {
    resetButton.style.display = '';
}


// Score and lives display section
function updateScoreAndLives() {
    document.getElementById("score").innerHTML = `Score: ${score}`;
    document.getElementById("lives").innerHTML = `Lives: ${lives}`;
}

// When score +1 we display a green screen
function scoreCorrect() {
    gameBoard.style.backgroundColor = "green"
    setTimeout(() => {
        gameBoard.style.backgroundColor = "white"
    }, 300)
}

// When lives -1 we display a red screen
function scoreWrong() {
    gameBoard.style.backgroundColor = "red"
    setTimeout(() => {
        gameBoard.style.background = "white"
    }, 300)
}

// When current score + 5 we increase our music notes velocity to increase the game difficulty
function increaseGameDifficulty() {
    if (score >= increasedVelocity) {
        noteArray.forEach(function (note) {
            note.velocity += 0.3;
        });
        currentVelocity += 0.3;
        increasedVelocity += 5;
    }
}


// Add Event Listenner section
document.addEventListener('keydown', (e) => {
    let keyMatched = false;

    // Get game board dimensions dynamically inside the event listener
    const gameBoard = document.getElementById('game-board');
    const gameBoardWidth = gameBoard.offsetWidth;
    const gameBoardHeight = gameBoard.offsetHeight;

    // Set my validation area
    const yThreshold = gameBoardHeight * 0.01;
    const yNegativeThreshold = -gameBoardHeight * 0.01;

    noteArray.forEach((musicNote, i) => {
        if (e.code === "ArrowLeft" &&
            musicNote.positionX === gameBoardWidth * 0.100 &&
            musicNote.positionY >= yNegativeThreshold &&
            musicNote.positionY <= yThreshold) {

            score++;
            keyMatched = true;
            scoreCorrect();

        } else if (e.code === 'ArrowUp' &&
            musicNote.positionX === gameBoardWidth * 0.325 &&
            musicNote.positionY >= yNegativeThreshold &&
            musicNote.positionY <= yThreshold) {

            score++;
            keyMatched = true;
            scoreCorrect();

        } else if (e.code === 'ArrowDown' &&
            musicNote.positionX === gameBoardWidth * 0.550 &&
            musicNote.positionY >= yNegativeThreshold &&
            musicNote.positionY <= yThreshold) {

            score++;
            keyMatched = true;
            scoreCorrect();

        } else if (e.code === 'ArrowRight' &&
            musicNote.positionX === gameBoardWidth * 0.775 &&
            musicNote.positionY >= yNegativeThreshold &&
            musicNote.positionY <= yThreshold) {

            score++;
            keyMatched = true;
            scoreCorrect();
        }

        if (keyMatched) {
            musicNote.domElement.remove();
            noteArray.splice(i, 1);
        }
    });

    if (keyMatched === false) {
        lives--;
        scoreWrong();
    }

    console.log("Score: " + score + "Lives: " + lives);
    increaseGameDifficulty();
    updateScoreAndLives();
    gameOver();
});




