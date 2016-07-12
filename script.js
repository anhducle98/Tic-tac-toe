var playerSymbol;
var currentTurn = 'X';
var a = [
    [' ', ' ', ' '],
    [' ', ' ', ' '],
    [' ', ' ', ' ']
];

function hideIt() {
    var div = document.getElementById("selectXO");
    div.parentNode.removeChild(div);
}

function choose(side) {
    playerSymbol = side;
    console.log("playerSymbol = " + playerSymbol);
    if (playerSymbol == 'O') {
        AIplay();
    }
    hideIt();
}

function resetGame() {
    for (let x = 0; x < 3; ++x) {
        for (let y = 0; y < 3; ++y) {
            a[x][y] = ' ';
        }
    }
    currentTurn = 'X';
    drawBoard();
    if (playerSymbol == 'O') {
        AIplay();
    }
}

function hasWinner() {
    for (let x = 0; x < 3; ++x) {
        if (a[x][0] != ' ' && a[x][0] == a[x][1] && a[x][1] == a[x][2]) return true;
    }
    for (let y = 0; y < 3; ++y) {
        if (a[0][y] != ' ' && a[0][y] == a[1][y] && a[1][y] == a[2][y]) return true;
    }
    if (a[1][1] != ' ' && a[0][0] == a[1][1] && a[1][1] == a[2][2]) return true;
    if (a[1][1] != ' ' && a[0][2] == a[1][1] && a[1][1] == a[2][0]) return true;
    return false;
}

function gameTie() {
    for (let x = 0; x < 3; ++x) {
        for (let y = 0; y < 3; ++y) {
            if (a[x][y] == ' ') return false;
        }
    }
    return true;
}

function drawBoard() {
    for (let x = 0; x < 3; ++x) {
        for (let y = 0; y < 3; ++y) {
            let c = document.getElementById("c" + x + y);
            c.innerHTML = a[x][y];
        }
    }
    if (hasWinner() || gameTie()) {
        $("#board").animate({
                opacity: 0
            },
            1000,
            function() {
                $("#board").css("opacity", 1);
                resetGame();
            }
        );
    }
}

function AIplay() {
    var cells = document.getElementsByClassName("cell");
    var c = [];
    for (cell of cells) {
        if (cell.innerHTML == ' ') {
            c.push(cell);
        }
    }

    if (c.length == 0) return;
    
    var pick = Math.floor(Math.random() * c.length);
    let id = c[pick].id;
    let x = Number(id[1]);
    let y = Number(id[2]);
    a[x][y] = currentTurn;
    if (currentTurn == 'X') {
        currentTurn = 'O'
    } else {
        currentTurn = 'X';
    }
    drawBoard();
}

function initEventListeners() {
    var cells = document.getElementsByClassName("cell");
    for (c of cells) {
        let id = $(c).attr("id");
        let x = Number(id[1]);
        let y = Number(id[2]);
        let f = function() {
            if (a[x][y] != ' ') return;
            if (currentTurn != playerSymbol) return;
            a[x][y] = playerSymbol;
            if (currentTurn == 'X') {
                currentTurn = 'O'
            } else {
                currentTurn = 'X';
            }
            let AI_should_play = !(hasWinner() || gameTie());
            drawBoard();
            if (AI_should_play) AIplay();
        }
        $(c).click(f);
    }
}

$(document).ready(function() {
    drawBoard();
    initEventListeners();
});