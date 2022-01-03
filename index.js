//variables initialization
let ButtonPressCount = 0;
let activePlayer = 1;
let activeText = document.getElementById('activePlayer');
let gameOverDiv = document.getElementById("gameOver")
let gameWinDiv = document.getElementById("onWin")
let gameDiv = document.getElementById("GameDiv")
let formDiv = document.getElementById("formDiv")
//import audio files
let player1Audio = new Audio("/resources/A.wav");
let player2Audio = new Audio("/resources/B.wav");
let winningAudio = new Audio("/resources/winning.wav");
let gameoverAudio = new Audio("/resources/GameOver.wav");

//initial user
let player1 = { name: "", selected: [] }
let player2 = { name: "", selected: [] }

//when startGame button click
let FormSubmit = () => {
    let p1 = document.getElementById("player1");
    let p2 = document.getElementById("player2");
    if ((p1.value !== "") && (p2.value !== "")) {
        player1 = { name: (p1.value).toUpperCase(), selected: [] }
        player2 = { name: (p2.value).toUpperCase(), selected: [] }
        formDiv.style.display = "none";
        gameDiv.style.display = "block";
        gameOverDiv.style.display = "none";
        gameWinDiv.style.display = "none";
        console.log(player1)
        activeText.innerText = `Now it's ${player1.name}'s turn`;
    }
    else {
        p1.focus();
    }
}
//when game is over
let onWinning = (playerName) => {
    gameDiv.style.display = "none";
    document.getElementById("winMsg").innerText = `${playerName} IS WON THE MATCH`
    gameWinDiv.style.display = "inline";
    player1 = { name: player1.name, selected: [] }
    player2 = { name: player2.name, selected: [] }

}
let GameOver = (player1, player2) => {
    ButtonPressCount = 0;
    gameDiv.style.display = "none"
    document.getElementById("gameOverHeading").innerHTML = `${player1} and ${player2} You Both Are Awesome<br><h1>NOW GAME OVER</h1>`;
    gameOverDiv.style.display = "inline";
    player1 = { name: player1.name, selected: [] }
    player2 = { name: player2.name, selected: [] }
}
let clear = () => {
    let a = document.querySelectorAll(".gameBtn");
    Array.from(a).forEach((e) => {
        e.innerText = "";
    })
}
//handel changePlayer button
let changePlayer = () => {
    ButtonPressCount = 0;
    clear();
    PlayerDetails();

}

//handel play again
let playAgain = () => {
    ButtonPressCount = 0;
    clear();
    formDiv.style.display = "none";
    player1 = { name: player1.name, selected: [] }
    player2 = { name: player2.name, selected: [] }
    gameOverDiv.style.display = "none";
    gameWinDiv.style.display = "none";
    gameDiv.style.display = "block";
}
let PlayerDetails = () => {
    player1 = { name: "", selected: [] }
    player2 = { name: "", selected: [] }
    gameDiv.style.display = "none";
    gameWinDiv.style.display = "none";
    formDiv.style.display = "block";
}
//check player win or not
function isWin(arr) {
    arr = arr.sort();
    const conditions = [[1, 2, 3], [4, 5, 6], [7, 8, 9], [1, 4, 7], [2, 5, 8], [3, 6, 9], [1, 5, 9], [3, 5, 7]]; //wining constions
    if (arr.length >= 3) {
        for (let index = 0; index < conditions.length; index++) {
            const condition = conditions[index];
            let countMatch = 0;
            for (let i = 0; i < arr.length; i++) {
                const elem = arr[i];
                if (condition.includes(elem)) { countMatch++; }
                if (countMatch === 3) { return true; }
            }
        }
    }
}

let turn = (player, btn) => {
    ButtonPressCount++;
    if (player == player1) {
        player1Audio.play();
        btn.innerText = "O";
        activePlayer = 2;
        activeText.innerText = `Now it's ${player2.name}'s turn`;
    } else {
        player2Audio.play();
        btn.innerText = "X";
        activePlayer = 1;
        activeText.innerText = `Now it's ${player1.name}'s turn`;
    }
    player.selected.push(Number(btn.name))
    if (isWin(player.selected)) {
        onWinning(player.name);
        winningAudio.play();

    } else if (ButtonPressCount === 9) {
        GameOver(player1.name, player2.name);
        gameoverAudio.play();
    }
}

//--------------handel click-----------
function ClickHandel(btn) {
    if (btn.innerText == "") {
        if (activePlayer === 1) {
            turn(player1, btn);
        } else {
            turn(player2, btn);
        }
    }

}