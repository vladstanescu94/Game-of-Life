let board;
let cols;
let rows;
let resolution = 10;
let alive = 0;
let flag = false;
let main = document.getElementById("main");
let div = document.createElement("div");
let fps;
function makeBoard(cols, rows) {
  let arr = new Array(cols);

  for (let i = 0; i < arr.length; i++) {
    arr[i] = new Array(rows);
  }
  return arr;
}


function setup() {
  frameRate(60);
  createCanvas(600, 600);
  cols = width / resolution;
  rows = height / resolution;


  board = makeBoard(cols, rows);
    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            board[i][j] = 0;
        }
    }
    button = createButton("Glider");
    button.mousePressed(gunGlider);
    background(0);
    //randomizeCells(board);  
}


function gunGlider(){

    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            board[i][j] = 0;
        }
    }
    board[2][5] = 1;board[2][6] = 1;board[3][5] = 1;board[3][6] = 1;
    board[12][5] = 1;board[12][6] = 1;board[12][7] = 1;
    board[13][4] = 1;board[13][8] = 1;
    board[14][3] = 1;board[14][9] = 1;
    board[15][3] = 1;board[15][9] = 1;
    board[16][6] = 1;
    board[17][4] = 1;board[17][8] = 1;
    board[18][5] = 1;board[18][6] = 1;board[18][7] = 1;
    board[19][6] = 1;
    board[22][3] = 1;board[22][4] = 1;board[22][5] = 1;
    board[23][3] = 1;board[23][4] = 1;board[23][5] = 1;
    board[24][2] = 1;board[24][6] = 1;
    board[26][1] = 1;board[26][2] = 1;board[26][6] = 1; board[26][7] = 1;
    board[36][4] = 1;board[36][5] = 1;
    board[37][4] = 1;board[37][5] = 1;

}

function mouseClicked() {
    if(mouseX >= 0 && mouseX <= width && mouseY >= 0 && mouseY <= height){
        let x = int(mouseX/resolution)* resolution;
        let y = int(mouseY/resolution)* resolution;
        //if (board[i][j] == 1) {
        fill(0, 255, 0);
        stroke(0);
        rect(x, y, resolution - 1, resolution - 1);
        if(board[x/resolution][y/resolution] != 1){
            board[x/resolution][y/resolution] = 1;
        }else{
            board[x/resolution][y/resolution] = 0;
            fill(0, 0, 0);
            stroke(0);
            rect(x, y, resolution - 1, resolution - 1);
        }
    } 
}

function keyPressed() {
    if(flag == false){
        flag = true;
    } else {
        flag = false;
    }
  }

function draw() {
    // console.log(flag)
    // console.log(mouseX, mouseY)
    if(flag == true){
       drawCells(board);
    
    
        let nextGeneration = makeBoard(cols, rows);

        for (let i = 0; i < cols; i++) {
            for (let j = 0; j < rows; j++) {
            let state = board[i][j];

            //Numara vecini in viata
            let neighbors = countNeighbors(board, i, j);

            if (state == 0 && neighbors == 3) {
                //Daca are 3 vecini in viata creeaza celula noua
                nextGeneration[i][j] = 1;
            } else if (state == 1 && neighbors < 2 || neighbors > 3) {
                //Daca e in viata si are mai putin de 2 vecini sau mai
                //mult de 3 atunci moare
                nextGeneration[i][j] = 0;
            } else {
                nextGeneration[i][j] = state;
            }
        }
    }
  

  board = nextGeneration;
  alive = checkAlive(board);  
  div.innerHTML = alive;
  main.appendChild(div);
}
}

function countNeighbors(board, x, y) {

  let sum = 0;
  for (let i = -1; i < 2; i++) {
    for (let j = -1; j < 2; j++) {

      let col = (x + i + cols) % cols;
      let row = (y + j + rows) % rows;
      sum += board[col][row];
    }
  }

  sum -= board[x][y];
  return sum;
}

function randomizeCells(board) {
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      board[i][j] = floor(random(2));
    }
  }
}

function checkAlive(board) {
  alive= 0;
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      if (board[i][j] == 1){
        alive++;
      }
    }
  }
  return alive;
}

function drawCells(board) {
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      let x = i * resolution;
      let y = j * resolution;
      if (board[i][j] == 1) {
        fill(0, 255, 0);
        stroke(0);
        rect(x, y, resolution - 1, resolution - 1);
      } else{
        fill(0, 0, 0);
        stroke(0);
        rect(x, y, resolution - 1, resolution - 1);
      }
    }
  }
}
