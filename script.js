console.log('Guitar Zeroes is working!');

const allKey = document.querySelectorAll(".keynote")
const resetButton = document.getElementById("resetButton")
const gameBoard = document.querySelector("#game-board")


const noteArray = [];
const positionsArr = [70, 225, 381, 537]
let score = 0;
let lives = 3;

// Class section

class MusicNote {
    constructor() {
        this.width = 5;
        this.height = 5;
        this.color = 'black';
        this.positionX = positionsArr[Math.floor(Math.random() * positionsArr.length)];
        this.positionY = 100;
        this.domElement = null;
        this.createDomElement();
        this.velocity = 1;
    }

    createDomElement() {
        this.domElement = document.createElement("div");
        this.domElement.className = "music-note";
        this.domElement.style.width = this.width + "vw";
        this.domElement.style.height = this.height + "vh";
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


        if (note.positionY < -20) {
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
    }
}

// Reset variable to restart game
function resetVariable() {
    noteArray.forEach(note => note.domElement.remove());
    noteArray.length = 0;
    lives = 3;
    score = 0;
    updateScoreAndLives();
    clearInterval(moveCreationInterval);
    clearInterval(noteCreationInterval);

    noteCreationInterval = setInterval(() => {
        noteArray.push(new MusicNote())
    }, 1500);

    moveCreationInterval = setInterval(() => {
        noteArray.forEach((note, i) => {
            note.moveDown();
            if (note.positionY < -20) {
                note.domElement.remove();
                noteArray.splice(i, 1);
                lives--;
                gameOver()
            }
            updateScoreAndLives();
        })
    }, 15);
}

// Reset button
resetButton.addEventListener("click", function () {
    resetVariable();
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

function scoreCorrect(){
    gameBoard.style.backgroundColor = "green"
    setTimeout(() => {
    gameBoard.style.backgroundColor = "white"

    }, 300)
}


// Add Event Listenner section

document.addEventListener('keydown', (e) => {
    let keyMatched = false;
    noteArray.forEach((musicNote, i) => {
        if (e.code === "ArrowLeft" && musicNote.positionX === 70 && musicNote.positionY >= -10 && musicNote.positionY <= 10) {
            console.log("left arrow clicked")
            score++;
            keyMatched = true;
            scoreCorrect()
        } else if (e.code === 'ArrowUp' && musicNote.positionX === 225 && musicNote.positionY >= -10 && musicNote.positionY <= 10) {
            score++;
            keyMatched = true;
            scoreCorrect()
        } else if (e.code === 'ArrowDown' && musicNote.positionX === 381 && musicNote.positionY >= -10 && musicNote.positionY <= 10) {
            score++;
            keyMatched = true;
            scoreCorrect()
        } else if (e.code === 'ArrowRight' && musicNote.positionX === 537 && musicNote.positionY >= -10 && musicNote.positionY <= 10) {
            score++;
            keyMatched = true;
            scoreCorrect()
        }
        musicNote.domElement.remove();
        noteArray.splice(i, 1);
    });

    if (keyMatched === false) {
        lives--;
    }
    console.log("Score: " + score + "Lives: " + lives);
    updateScoreAndLives();
    gameOver();
});




