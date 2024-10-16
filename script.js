const allKey = document.querySelectorAll(".keynote");
const resetButton = document.getElementById("resetButton");
const gameBoard = document.querySelector("#game-board");
const audio = document.getElementById("naive-music");
const startButton = document.getElementById("startButton");
const flammeImage = document.getElementById("flamme-image");
const buttonsImages = [
    "visualAssets/redButton.png",
    "visualAssets/greenButton.png",
    "visualAssets/blueButton.png",
    "visualAssets/yellowButton.png",
];
const winMessage = document.getElementById("");
const noteArray = [];
let score = 0;
let lives = 30;
let currentVelocity = 1;
let increasedVelocity = 10;
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
                console.log(lives);
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
        alert("Game over! Strings broken.. Your final score is: " + score);
        audio.pause();
        hideStartButton();
        showResetButton();
    }
}

// Reset variable to restart game
function resetVariable() {
    noteArray.forEach(note => note.domElement.remove());
    noteArray.length = 0;
    lives = 30;
    score = 0;
    currentVelocity = 1;
    audio.play();
    updateScoreAndLives();
    clearInterval(moveCreationInterval);
    clearInterval(noteCreationInterval);
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

//Function win game
function winGame() {
    clearInterval(moveCreationInterval);
    clearInterval(noteCreationInterval);    
    audio.pause();
    hideStartButton();
    hideResetButton();
    winMessage;
}

// Score and lives display section
function updateScoreAndLives() {
    document.getElementById("score").innerHTML = `Score: ${score}`;
    document.getElementById("lives").innerHTML = `Lives: ${lives}`;
    if (score >= 100) {
        wingame();
    }
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

// When current score + 5 we increase our music notes velocity to increase the game difficulty
function increaseGameDifficulty() {
    if (score >= increasedVelocity) {
        noteArray.forEach(function (note) {
            note.velocity += 0.2;
        });
        currentVelocity += 0.2;
        increasedVelocity += 10;
    }
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
            score++;
            keyMatched = true
            scoreCorrect();

        } else if (e.code === 'ArrowUp' &&
            musicNote.positionX === gameBoardWidth * 0.300 &&
            musicNote.positionY >= yNegativeThreshold &&
            musicNote.positionY <= yThreshold) {
            musicNote.domElement.style.backgroundImage = `url(visualAssets/flamme.gif)`;

            score++;
            keyMatched = true

            scoreCorrect();

        } else if (e.code === 'ArrowDown' &&
            musicNote.positionX === gameBoardWidth * 0.525 &&
            musicNote.positionY >= yNegativeThreshold &&
            musicNote.positionY <= yThreshold) {
            musicNote.domElement.style.backgroundImage = `url(visualAssets/flamme.gif)`;

            score++;
            keyMatched = true

            scoreCorrect();

        } else if (e.code === 'ArrowRight' &&
            musicNote.positionX === gameBoardWidth * 0.750 &&
            musicNote.positionY >= yNegativeThreshold &&
            musicNote.positionY <= yThreshold) {
            musicNote.domElement.style.backgroundImage = `url(visualAssets/flamme.gif)`;

            score++;
            keyMatched = true

            scoreCorrect();
        }

        if (keyMatched) {
            setTimeout(() => {
                musicNote.domElement.remove();
            }, 1000);
            noteArray.splice(i, 1);
            keyMatched = false
        }
    });
    if (keyMatched === false) {
        lives--;
    }
    increaseGameDifficulty();
    updateScoreAndLives();
    gameOver();
});




