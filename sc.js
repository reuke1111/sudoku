let l = document.getElementById("continer");

function increment(event) {
    let count = parseInt(event.target.innerText) || 0;
    count += 1;
    if (count === 10) {
        count = 1;
    }
    event.target.innerText = count;
}
let solutions= [
    [1, 2, 3, 4, 5, 6, 7, 8, 9],
    [4, 5, 6, 7, 8, 9, 1, 2, 3],
    [7, 8, 9, 1, 2, 3, 4, 5, 6],
    [2, 3, 1, 5, 6, 4, 8, 9, 7],
    [5, 6, 4, 8, 9, 7, 2, 3, 1],
    [8, 9, 7, 2, 3, 1, 5, 6, 4],
    [3, 1, 2, 6, 4, 5, 9, 7, 8],
    [6, 4, 5, 9, 7, 8, 3, 1, 2],
    [9, 7, 8, 3, 1, 2, 6, 4, 5]
];


function shuffleNumbers() {
    for (let i = 1; i <= 9; i++) {
        let ranNum = Math.floor(Math.random() * 9) + 1;
        swapNumbers(i, ranNum);
    }
}


function swapNumbers(n1, n2) {
    for (let y = 0; y < 9; y++) {
        for (let x = 0; x < 9; x++) {
            if (solutions[x][y] === n1) {
                solutions[x][y] = n2; 
            } else if (solutions[x][y] === n2) {
                solutions[x][y] = n1; 
            }
        }
    }
}


function shuffleRows() {
    for (let i = 0; i < 9; i++) {
        let ranNum = Math.floor(Math.random() * 3);
        let blockNumber = Math.floor(i / 3);
        swapRows(i, blockNumber * 3 + ranNum);
    }
}

function swapRows(r1, r2) {
    let temp = solutions[r1];
    solutions[r1] = solutions[r2];
    solutions[r2] = temp;
}


function shuffleCols() {
    for (let i = 0; i < 9; i++) {
        let ranNum = Math.floor(Math.random() * 3); 
        let blockNumber = Math.floor(i / 3);
        swapCols(i, blockNumber * 3 + ranNum);
    }
}


function swapCols(c1, c2) {
    for (let i = 0; i < 9; i++) {
        let colVal = solutions[i][c1];
        solutions[i][c1] = solutions[i][c2];
        solutions[i][c2] = colVal;
    }
}

function shuffle3X3Rows() {
    for (let i = 0; i < 3; i++) {
        let ranNum = Math.floor(Math.random() * 3); 
        swap3X3Rows(i, ranNum);
    }
}

function swap3X3Rows(r1, r2) {
    for (let i = 0; i < 3; i++) {
        swapRows(r1 * 3 + i, r2 * 3 + i);
    }
}

function shuffle3X3Cols() {
    for (let i = 0; i < 3; i++) {
        let ranNum = Math.floor(Math.random() * 3); 
        swap3X3Cols(i, ranNum);
    }
}


function swap3X3Cols(c1, c2) {
    for (let i = 0; i < 3; i++) {
        swapCols(c1 * 3 + i, c2 * 3 + i);
    }
}
shuffleNumbers();
shuffleRows();
shuffleCols();
shuffle3X3Rows();
shuffle3X3Cols();
let grid=[];

function generateSudokuGrid() {
    
    grid = solutions;
    
    let puzzle = grid.map(row => row.slice()); 
    for (let i = 0; i < 40; i++) { 
        let row = Math.floor(Math.random() * 9);
        let col = Math.floor(Math.random() * 9);
        puzzle[row][col] = 0; 
    }
    
    return puzzle;
}
function checkSolution() {
    let cells = document.getElementsByClassName("cells");
    let correct = true;
    
    for (let i = 0; i < cells.length; i++) {
        let row = parseInt(cells[i].getAttribute('data-row'));
        let col = parseInt(cells[i].getAttribute('data-col'));
        let value = parseInt(cells[i].innerText);
        
        if (value !== solutionGrid[row][col]) {
            cells[i].style.backgroundColor = "lightcoral";
            correct = false;
        } else {
            cells[i].style.backgroundColor = "lightgreen"; 
        }
    }
    
    if (correct) {
        alert("Congratulations! You solved the puzzle correctly.");
    } else {
        alert("There are still some mistakes.");
    }
}

function start() {
    l.innerHTML = ""; 
    let sudokuGrid = generateSudokuGrid(); 
   
    for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
            let div = document.createElement('div');
            let value = sudokuGrid[row][col];
            
            if (value === 0) { 
                div.innerText = "";
                div.onclick = increment; 
                div.style.color = "red"; 
            } else {
                div.innerText = value;
                div.style.color = "black"; 
            }
            
            div.className = "cells"; 
            div.setAttribute('data-row', row); 
            div.setAttribute('data-col', col); 
            l.appendChild(div);
        }
    }

    solutionGrid = grid;
}

start();
