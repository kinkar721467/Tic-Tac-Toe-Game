let box = document.querySelectorAll('.box');
let resetBtn = document.querySelector('#reset-game');
let newGame = document.querySelector('#new-game');
let gameContainer = document.querySelector('.winner-container');
let winner = document.querySelector('#game-winner');

alert("You want to play this game press ok")
let player1 = prompt("Enter the player 1 name : ");
let player2 = prompt("Enter the player 2 name : ")
let turn_0 = true;

const winPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

const resetgame = () => {
    turn_0 = true;
    enableBoxs();
    gameContainer.classList.add('hide');
}

const enableBoxs = () => {
    for (let boxs of box) {
        boxs.disabled = false;
        boxs.innerText = "";
    }
}

const showWinner = (gameWinner) => {
    if (gameWinner == "O") { 
        winner.innerText = `Congratulations ${player1}`;
    } else {
        winner.innerText = `Congratulations ${player2}`;
    }
    gameContainer.classList.remove("hide");
    disabledBoxs();
    document.getElementById("myAudio").play();
};

const checkWinner = () => {
    for (let patterns of winPatterns) {
        let pos0Val = box[patterns[0]].innerText;
        let pos1Val = box[patterns[1]].innerText;
        let pos2Val = box[patterns[2]].innerText;

        if (pos0Val != "" && pos1Val != "" && pos2Val != "") {
            if (pos0Val == pos1Val && pos1Val == pos2Val) {
                showWinner(pos0Val);
            }
        }
    }

    if ([...box].every(btn => btn.innerText !== "")) {
        winner.innerText = "It's a draw!";
        gameContainer.classList.remove("hide");
        disabledBoxs();
    }
}

const disabledBoxs = () => {
    for (let boxs of box) {
        boxs.disabled = true;
    }
}

box.forEach((btn) => {
    btn.addEventListener('click', () => {
        if (btn.innerText === "") { 
            if (turn_0) {
                btn.innerText = "O";
                turn_0 = false;
                btn.style.color = 'white';
            } else {
                btn.innerText = "✖";
                turn_0 = true;
                btn.style.color = 'red';
            }
            btn.disabled = true;
            checkWinner();
            document.getElementById('myAudioClick').play();
        }
    });
});

newGame.addEventListener('click', resetgame);
resetBtn.addEventListener('click', resetgame);
