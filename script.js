const allKey = document.querySelectorAll(".keynote");
const resetButton = document.getElementById("resetButton");
const gameBoard = document.querySelector("#game-board");

let muted = false;
const naiveMusic = document.getElementById("naive-music");

const sounds = [
    errorSound = document.getElementById("error-sound"),
    redSound = document.getElementById("red-sound"),
    greenSound = document.getElementById("green-sound"),
    blueSound = document.getElementById("blue-sound"),
    yellowSound = document.getElementById("yellow-sound"),
    gameOverSound = document.getElementById("game-over-sound"),
    youWinsound = document.getElementById("you-win-sound"),
    startGameSound = document.getElementById("start-game-sound"),
    streakSound = document.getElementById("streak-sound")
]


const startButton = document.getElementById("startButton");
const startScreen = document.getElementById("start-screen")
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
let increasedVelocity = 25;
let consecutiveHits = 0;
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
        increasedVelocity += 25;
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
        naiveMusic.pause();
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
        naiveMusic.pause();
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
    consecutiveHits = 0;
    currentVelocity = 1;
    increasedVelocity = 25;
    gameBoard.style.backgroundImage = "url('visualAssets/Pixel-background-obsolete men.gif')";
    naiveMusic.src = "visualAssets/Naive.mp3";
    naiveMusic.play();
    updateScoreAndLives();
    clearInterval(moveCreationInterval);
    clearInterval(noteCreationInterval);
    document.getElementById("game-over-screen").style.display = "none";
    document.getElementById("you-win-screen").style.display = "none";
    hideResetButton();
    showResetButton();

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
startButton.addEventListener("click", function () {
    startScreen.style.display = "none";
    startGameIntervals();
    startGameSound.play();
    naiveMusic.play();
    naiveMusic.currentTime = 0;
    hideStartButton();
    showResetButton();
});


// Reset button
resetButton.addEventListener("click", function () {
    resetVariable();
    startGameSound.play();
    naiveMusic.play();
    naiveMusic.currentTime = 0;
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
    document.getElementById("score").innerHTML = `🔥 SCORE: ${score}/100`;
    document.getElementById("lives").innerHTML = `❤️ LIVES: ${lives}`;
}

// Streak message
function showStreakMessage(message) {
    const streakMessage = document.getElementById('streak-message');
    streakSound.play();
    streakMessage.innerText = message;
    streakMessage.style.display = 'block';

    setTimeout(() => {
        streakMessage.style.display = 'none';
    }, 2000);
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


        } else if (e.code === 'ArrowUp' &&
            musicNote.positionX === gameBoardWidth * 0.300 &&
            musicNote.positionY >= yNegativeThreshold &&
            musicNote.positionY <= yThreshold) {
            musicNote.domElement.style.backgroundImage = `url(visualAssets/flamme.gif)`;

            greenSound.play();
            score++;
            keyMatched = true


        } else if (e.code === 'ArrowDown' &&
            musicNote.positionX === gameBoardWidth * 0.525 &&
            musicNote.positionY >= yNegativeThreshold &&
            musicNote.positionY <= yThreshold) {
            musicNote.domElement.style.backgroundImage = `url(visualAssets/flamme.gif)`;

            blueSound.play();
            score++;
            keyMatched = true


        } else if (e.code === 'ArrowRight' &&
            musicNote.positionX === gameBoardWidth * 0.750 &&
            musicNote.positionY >= yNegativeThreshold &&
            musicNote.positionY <= yThreshold) {
            musicNote.domElement.style.backgroundImage = `url(visualAssets/flamme.gif)`;

            yellowSound.play();
            score++;
            keyMatched = true

        }

        if (keyMatched) {
            consecutiveHits++;
            if (consecutiveHits === 10) {
                lives++;
                showStreakMessage("YOU ROCK! + 1 ❤️");
                consecutiveHits = 0;
            }

            setTimeout(() => {
                musicNote.domElement.remove();
            }, 1000);
            noteArray.splice(i, 1);

        }
    });
    winGame();
    if (keyMatched === false) {
        consecutiveHits = 0;
        errorSound.play();
    }
    increaseGameDifficulty();
    updateScoreAndLives();
    gameOver();

});


// AddEventListenner to my mute button
document.getElementById('music-off').addEventListener('click', toggleMute);

function toggleMute() {
    muted = !muted;

    if (muted) {
        sounds.forEach(sound => {
            sound.volume = 0;
        });
        naiveMusic.volume = 0;
        document.getElementById('music-off').src = 'visualAssets/music-off.svg';
    } else {
        sounds.forEach(sound => {
            sound.volume = 1;
        });
        naiveMusic.volume = 1;
        document.getElementById('music-off').src = 'visualAssets/music-on.svg';
    }
}



// Easter egg 🐣
function activateEasterEgg() {
    lives += 100;
    score += 90;
    updateScoreAndLives();

    gameBoard.style.backgroundImage = "url('visualAssets/easter-egg-image.gif')"
    naiveMusic.src = "visualAssets/easter-egg-song.mp3";
    naiveMusic.play();
}

guitarIcon.addEventListener("click", activateEasterEgg);