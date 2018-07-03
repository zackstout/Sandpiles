
const width = 700;
const height = 700;
const numCells = 15;
const girth = width / numCells; // assumes W == H
let grid = [];
let pars = [];

function setup() {
  createCanvas(width, height);
  background(200);
  drawGrid();
  // console.log(grid);
  updateGrid();
  updateGrid();

}

function draw() {
  frameRate(1);
  // drawGrid();
  // while (containsMax(grid)) {
  //   updateGrid();
  // }
}



function drawGrid() {
  for (var i=0; i < numCells; i++) {
    for (var j=0; j < numCells; j++) {
      fill('green');
      let r = rect(i * girth, j * girth, girth, girth);
      // r.i = i;
      // r.j = j;
      // r.count = 0;
      grid.push({i: i, j: j, count: 0}); // why is this different from grid.push(r) ??????
    }
  }

  let cen = Math.floor(numCells/2);
  let center = grid[cen * numCells + cen];
  // console.log(center);

  // But this example only works because ....WAit, does this work?
  center.count = 90;
  grid[cen * numCells + cen - 1].count = 5;
}



function updateGrid() {
  background(200);


  // Add to neighbors for tumblers:
  for (let i=0; i < numCells; i++) {
    for (let j=0; j < numCells; j++) {
      const cell = grid[i * numCells + j]; // current cell

      const top = grid[(i - 1) * numCells + j];
      const btm = grid[(i + 1) * numCells + j];
      const left = grid[i * numCells + (j - 1)];
      const right = grid[i * numCells + (j + 1)];

      if (cell.count > 3) {
        if (top) top.count ++;
        if (btm) btm.count ++;
        if (left) left.count ++;
        if (right) right.count ++;

      }
    }
  }


  // Subtract from tumblers:
  for (let i=0; i < numCells; i++) {
    for (let j=0; j < numCells; j++) {
      const cell = grid[i * numCells + j]; // current cell

      if (cell.count > 3) {
        cell.count -= 4;
      }
    }
  }

  // Nice:
  var pars = selectAll('p');
  pars.forEach(p => p.remove());


  // Display results:
  for (let i=0; i < numCells; i++) {
    for (let j=0; j < numCells; j++) {
      const cell = grid[i * numCells + j]; // current cell
      let p = createP(cell.count);
      p.position(i * girth + girth/2, j * girth + girth/2);
      pars.push(p);
    }
  }

  return grid;
}



// mat.length will be numCells^2:
function containsMax(mat) {
  for (i=0; i < mat.length; i++) {
    if (mat[i].count > 3) return true;
  }
  return false;
}
