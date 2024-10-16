const allKey = document.querySelectorAll(".keynote");
const resetButton = document.getElementById("resetButton");
const gameBoard = document.querySelector("#game-board");

const audio = document.getElementById("naive-music");
const errorSound = document.getElementById("error-sound");
const redSound = document.getElementById("red-sound");
const greenSound = document.getElementById("green-sound");
const blueSound = document.getElementById("blue-sound");
const yellowSound = document.getElementById("yellow-sound");
const gameOverSound = document.getElementById("game-over-sound");
const youWinsound = document.getElementById("you-win-sound");

const startButton = document.getElementById("startButton");
const flammeImage = document.getElementById("flamme-image");
const youWinScreen = document.getElementById("you-win-screen");
const gameOverScreen = document.getElementById("game-over-screen");
const guitarIcon = document.getElementById("guitar-icon");
const buttonsImages = [
    "visualAssets/redButton.png",
    "visualAssets/greenButton.png",
    "visualAssets/blueButton.png",
    "visualAssets/yellowButton.png",
];
const noteArray = [];
let score = 0;
let lives = 5;
let currentVelocity = 1;
let increasedVelocity = 20;
buttonVisibility();

// Calculate positions relative to the game board width
function calculateGameBoardPositions() {
    const gameBoard = document.getElementById('game-board');
    const gameBoardWidth = gameBoard.offsetWidth;

    const positionsArr = [
        gameBoardWidth * 0.090,
        gameBoardWidth * 0.300,
        gameBoardWidth * 0.525,
        gameBoardWidth * 0.750,
    ];

    return positionsArr;
}

// When current score + 20 we increase our music notes velocity to increase the game difficulty
function increaseGameDifficulty() {
    if (score >= increasedVelocity) {
        noteArray.forEach(function (note) {
            note.velocity += 0.3;
        });
        currentVelocity += 0.3;
        increasedVelocity += 20;
    }
}

// Class section
class MusicNote {
    constructor() {
        this.width = 5;
        this.height = 5;

        this.column = Math.floor(Math.random() * 4);

        const positionsArr = calculateGameBoardPositions();
        this.positionX = positionsArr[this.column];
        this.positionY = 74;
        this.domElement = null;
        this.image = buttonsImages[this.column]
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
        this.domElement.style.backgroundImage = `url(${buttonsImages[this.column]})`
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
function startGameIntervals() {
    noteCreationInterval = setInterval(() => {
        noteArray.push(new MusicNote())

    }, 750);

    moveCreationInterval = setInterval(() => {
        noteArray.forEach((note, i) => {
            note.moveDown();

            if (note.positionY < -5) {
                note.domElement.remove();
                noteArray.splice(i, 1);
                lives--;
                errorSound.play();
                gameOver()
            }
            updateScoreAndLives();
        })
    }, 15);
}


// Game Over function
function gameOver() {
    if (lives <= 0) {
        clearInterval(moveCreationInterval);
        clearInterval(noteCreationInterval);
        audio.pause();
        gameOverSound.play();
        hideStartButton();
        showResetButton();
        document.getElementById("game-over-screen").style.display = "block";
        noteArray.forEach(note => {
            note.domElement.remove();
        });
        noteArray.length = 0;
    }
}

//Function win game
function winGame() {
    if (score >= 100) {
        clearInterval(moveCreationInterval);
        clearInterval(noteCreationInterval);
        audio.pause();
        youWinsound.play();
        hideStartButton();
        showResetButton();
        document.getElementById("you-win-screen").style.display = "block";
        noteArray.forEach(note => {
            note.domElement.remove();
        });
        noteArray.length = 0;
    }
}


// Reset variable to restart game
function resetVariable() {
    noteArray.forEach(note => note.domElement.remove());
    noteArray.length = 0;
    lives = 5;
    score = 0;
    currentVelocity = 1;
    audio.play();
    updateScoreAndLives();
    clearInterval(moveCreationInterval);
    clearInterval(noteCreationInterval);
    document.getElementById("game-over-screen").style.display = "none";
    document.getElementById("you-win-screen").style.display = "none";
    hideResetButton();

    noteCreationInterval = setInterval(() => {
        noteArray.push(new MusicNote())
    }, 750);

    moveCreationInterval = setInterval(() => {
        noteArray.forEach((note, i) => {
            note.moveDown();
            if (note.positionY < -5) {
                note.domElement.remove();
                noteArray.splice(i, 1);
                lives--;
                errorSound.play();
                gameOver()
            }
            updateScoreAndLives();
        })
    }, 15);
}


// Start button
const playSound = startButton.addEventListener("click", function () {
    startGameIntervals()
    audio.play();
    audio.currentTime = 0;
    hideStartButton();
});


// Reset button
resetButton.addEventListener("click", function () {
    resetVariable();
    audio.play();
    audio.currentTime = 0;
});

// Hide reset button
function hideResetButton() {
    resetButton.style.display = 'none';
}

// Show reset button
function showResetButton() {
    resetButton.style.display = '';
}

// Show start button
function showStartButton() {
    startButton.style.display = '';
}

// Hide start button
function hideStartButton() {
    startButton.style.display = 'none';
}

// Button visibility on home page
function buttonVisibility() {
    showStartButton();
    hideResetButton();
}

// Score and lives display section
function updateScoreAndLives() {
    document.getElementById("score").innerHTML = `Score: ${score}`;
    document.getElementById("lives").innerHTML = `Lives: ${lives}`;
}

// When score +1 we display a green screen
function scoreCorrect() {
    setTimeout(() => {
        gameBoard.style.backgroundColor = "white"
    }, 300)
}

// When lives -1 we display a loose song
function scoreWrong() {

}




// Add Event Listenner section
document.addEventListener('keydown', (e) => {
    let keyMatched = false

    // Get game board dimensions dynamically inside the event listener
    const gameBoard = document.getElementById('game-board');
    const gameBoardWidth = gameBoard.offsetWidth;
    const gameBoardHeight = gameBoard.offsetHeight;

    // Set my validation area
    const yThreshold = gameBoardHeight * 0.01;
    const yNegativeThreshold = -gameBoardHeight * 0.01;

    noteArray.forEach((musicNote, i) => {
        if (e.code === "ArrowLeft" &&
            musicNote.positionX === gameBoardWidth * 0.090 &&
            musicNote.positionY >= yNegativeThreshold &&
            musicNote.positionY <= yThreshold) {
            musicNote.domElement.style.backgroundImage = `url(visualAssets/flamme.gif)`;

            redSound.play();
            score++;
            keyMatched = true
            scoreCorrect();

        } else if (e.code === 'ArrowUp' &&
            musicNote.positionX === gameBoardWidth * 0.300 &&
            musicNote.positionY >= yNegativeThreshold &&
            musicNote.positionY <= yThreshold) {
            musicNote.domElement.style.backgroundImage = `url(visualAssets/flamme.gif)`;

            greenSound.play();
            score++;
            keyMatched = true
            scoreCorrect();

        } else if (e.code === 'ArrowDown' &&
            musicNote.positionX === gameBoardWidth * 0.525 &&
            musicNote.positionY >= yNegativeThreshold &&
            musicNote.positionY <= yThreshold) {
            musicNote.domElement.style.backgroundImage = `url(visualAssets/flamme.gif)`;

            blueSound.play();
            score++;
            keyMatched = true
            scoreCorrect();

        } else if (e.code === 'ArrowRight' &&
            musicNote.positionX === gameBoardWidth * 0.750 &&
            musicNote.positionY >= yNegativeThreshold &&
            musicNote.positionY <= yThreshold) {
            musicNote.domElement.style.backgroundImage = `url(visualAssets/flamme.gif)`;

            yellowSound.play();
            score++;
            keyMatched = true
            scoreCorrect();
        }

        if (keyMatched) {
            setTimeout(() => {
                musicNote.domElement.remove();
            }, 1000);
            noteArray.splice(i, 1);
            //keyMatched = false
        }
    });
    winGame();
    if (keyMatched === false) {
        lives--;
        errorSound.play();
    }
    increaseGameDifficulty();
    updateScoreAndLives();
    gameOver();

});


function activateEasterEgg() {
    lives += 100;
    score += 80;
    updateScoreAndLives();
    gameBoard.style.backgroundImage = "url('visualAssets/easter-egg-image.gif')"
    audio.src = "visualAssets/easter-egg-song.mp3";
    audio.play();
}

guitarIcon.addEventListener("click", activateEasterEgg);


