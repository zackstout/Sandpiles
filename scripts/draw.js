
const width = 700;
const height = 700;
const numCells = 90;
const girth = width / numCells; // assumes W == H
let grid = [];
let pars = [];
let nextGrid = [];

function setup() {
  // createCanvas(width, height);
  // background(200);
  drawGrid();
  // console.log(grid);
  // updateGrid();
  // updateGrid();

}

function draw() {
  // frameRate(5);
  // drawGrid();
  updateGrid();
  // while (containsMax(grid)) {
  //   updateGrid();
  // }
}

// This is already ugly. We shoudl only call the display function once, when we're finished changing the data. (...?)



function drawGrid() {
  for (var i=0; i < numCells; i++) {
    for (var j=0; j < numCells; j++) {
      // fill('green');
      // let r = rect(i * girth, j * girth, girth, girth);

      grid.push({i: i, j: j, count: 0});
      nextGrid.push({i: i, j: j, count: 0});
    }
  }

  let cen = Math.floor(numCells/2);
  let center = grid[cen * numCells + cen];

  // Initialize values:
  center.count = 3000;
  // grid[cen * numCells + cen - 1].count = 5;

  // Display results:
  for (let i=0; i < numCells; i++) {
    for (let j=0; j < numCells; j++) {
      const cell = nextGrid[i * numCells + j]; // current cell

      let p = createP( ); // We can pass in cell.count here to see number.
      p.position(i * girth + girth/2, j * girth + girth/2);
      p.style('padding', `${girth/2}px`);
      // switch(cell.count) {
      //   case 0: p.style('background-color', 'green'); break;
      //   case 1: p.style('background-color', 'red'); break;
      //   case 2: p.style('background-color', 'blue'); break;
      //   case 3: p.style('background-color', 'yellow'); break;
      //   default: p.style('background-color', 'purple'); break;
      //
      // }
      pars.push(p);
    }
  }
}



function updateGrid() {
  // background(200);

  // Copy non-topplers:
  for (let i=0; i < numCells; i++) {
    for (let j=0; j < numCells; j++) {
      const cell = grid[i * numCells + j]; // current cell

      if (cell.count < 4) {
        nextGrid[i * numCells + j].count = cell.count;
      }
    }
  }

  // Handle topplers:
  for (let i=0; i < numCells; i++) {
    for (let j=0; j < numCells; j++) {
      const cell = grid[i * numCells + j]; // current cell

      const top = nextGrid[(i - 1) * numCells + j];
      const btm = nextGrid[(i + 1) * numCells + j];
      const left = nextGrid[i * numCells + (j - 1)];
      const right = nextGrid[i * numCells + (j + 1)];

      if (cell.count > 3) {
        if (top) top.count ++;
        if (btm) btm.count ++;
        if (left) left.count ++;
        if (right) right.count ++;
        nextGrid[i * numCells + j].count = grid[i * numCells + j].count - 4;
      }
    }
  }

  // WOW -- IT'S A LOTTTTT FASTER TO CHANGE BACKGROUND THAN DELETE/CREATE ALL THE CELLS:
  // Nice:
  // var pars = selectAll('p');
  // pars.forEach(p => p.remove());

  // Display results:
  for (let i=0; i < numCells; i++) {
    for (let j=0; j < numCells; j++) {
      const cell = nextGrid[i * numCells + j]; // current cell
      let p = pars[i * numCells + j];
      // let p = createP( ); // We can pass in cell.count here to see number.
      // p.position(i * girth + girth/2, j * girth + girth/2);
      // p.style('padding', `${girth/2}px`);
      switch(cell.count) {
        case 0: p.style('background-color', 'green'); break;
        case 1: p.style('background-color', 'red'); break;
        case 2: p.style('background-color', 'blue'); break;
        case 3: p.style('background-color', 'yellow'); break;
        default: p.style('background-color', 'purple'); break;

      }
      // pars.push(p);
    }
  }

  // This is VERY STRANGE, either way works, and at least one is necessary!
  // nextGrid = grid;
  grid = nextGrid;
}



// mat.length will be numCells^2:
function containsMax(mat) {
  for (i=0; i < mat.length; i++) {
    if (mat[i].count > 3) return true;
  }
  return false;
}
