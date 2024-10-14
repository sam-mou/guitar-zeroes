console.log('Guitar Zeroes is working!');

const allKey = document.querySelectorAll(".keynote")
console.log(allKey);

const positionsArr = [70, 225, 381, 537]
let score = 0;
let lives = 3;

// Class section

class MusicNote {
    constructor(){
        this.width = 5;
        this.height = 5;
        this.color = 'black';
        this.positionX = positionsArr[Math.floor(Math.random() * positionsArr.length)];
        this.positionY = 100;
        this.domElement = null;
        this.createDomElement();
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
    moveDown(){
        this.positionY--;
        this.domElement.style.bottom = this.positionY + "vh";
    }
}

// Interval section

const noteArray = [];

const noteCreationInterval = setInterval(() => {
    noteArray.push(new MusicNote())
  
},1500);

const moveCreationInterval = setInterval(() => {
    noteArray.forEach((note, i)=> {
        note.moveDown();
        console.log(note);
        

       if(note.positionY < -20){
           note.domElement.remove()
        noteArray.splice(i, 1)
       }
       
    }) 
},15);


// Game Over function
function gameOver() {
    if (lives <= 0) {
        clearInterval(moveCreationInterval);
        clearInterval(noteCreationInterval);
        alert("Game over! Strings broken.. Your final score is: " + score);
    }
}

// Score and lives display section

function updateScoreAndLives() {
    document.getElementById("score").innerHTML = `Score: ${score}`;
    document.getElementById("lives").innerHTML = `lives: ${lives}`;
}


// Add Event Listenner section

const musicNote = new MusicNote();
document.addEventListener('keyleft', (e) => {
    if(e.code === "ArrowLeft" && musicNote.positionX === 70 && musicNote.positionY >= -10 && musicNote.positionY <= 10) {
        score++
    } else {
        lives--
    }
    console.log("Score: " + score + "Lives: " + lives);
    updateScoreAndLives();
    gameOver();
});

document.addEventListener('keyup', (e) => {
    if(e.code === "ArrowUp" && musicNote.positionX === 225 && musicNote.positionY >= -10 && musicNote.positionY <= 10) {
        score++
    } else {
        lives--
    }
    console.log("Score: " + score + "Lives: " + lives);
    updateScoreAndLives();
    gameOver();
});

document.addEventListener('keydown', (e) => {
    if(e.code === "ArrowDown" && musicNote.positionX === 381 && musicNote.positionY >= -10 && musicNote.positionY <= 10) {
        score++
    } else {
        lives--
    }
    console.log("Score: " + score + "Lives: " + lives);
    updateScoreAndLives();
    gameOver();
});

document.addEventListener('keyright', (e) => {
    if(e.code === "ArrowRight" && musicNote.positionX === 537 && musicNote.positionY >= -10 && musicNote.positionY <= 10) {
        score++
    } else {
        lives--
    }
    console.log("Score: " + score + "Lives: " + lives);
    updateScoreAndLives();
    gameOver();
});
