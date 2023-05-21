const indexRow = (row) => {
  row = row.toUpperCase();
  const firstCharCode = "A".charCodeAt(0);

  return row.charCodeAt(0) - firstCharCode;
};

const stringToBoard = (puzzlestring) => {
  const grid = [];
  let tempRow = [];
  for (let i = 0; i < puzzlestring.length; i++) {
    if ((i + 1) % 9 > 0) {
      tempRow.push(+puzzlestring[i] || 0);
    } else {
      tempRow.push(+puzzlestring[i] || 0);
      grid.push(tempRow);
      tempRow = [];
    }
  }

  return grid;
};

const boardToString = (board) => {
  return board.flat().join("");
};

class SudokuSolver {
  validate(puzzleString) {
    if (puzzleString.length !== 81) {
      return { error: "Expected puzzle to be 81 characters long" };
    }

    if (puzzleString.match(/[^\.1-9]/)) {
      return { error: "Invalid characters in puzzle" };
    }

    return true;
  }

  checkRowPlacement(puzzleString, row, column, value) {
    value = +value || 0;
    row = indexRow(row);
    const grid = stringToBoard(puzzleString);

    if (grid[row][column - 1] === value) {
      grid[row][column - 1] = 0;
    }

    const conflict = grid[row].some((num, i) => num === value);

    return conflict ? false : true;
  }

  checkColPlacement(puzzleString, row, column, value) {
    value = +value || 0;
    row = indexRow(row);
    const grid = stringToBoard(puzzleString);

    if (grid[row][column - 1] === value) {
      grid[row][column - 1] = 0;
    }

    const conflict = grid.some((num) => num[column - 1] === value);
    return conflict ? false : true;
  }

  checkRegionPlacement(puzzleString, row, column, value) {
    value = +value || 0;
    row = indexRow(row);

    const grid = stringToBoard(puzzleString);

    if (grid[row][column - 1] === value) {
      grid[row][column - 1] = 0;
    }
    const region = [];

    const gridRowStart = Math.floor(row / 3) * 3;
    const gridColStart = Math.floor(column / 3) * 3;
    for (let i = gridRowStart; i < gridRowStart + 3; i++) {
      for (let j = gridColStart; j < gridColStart + 3; j++) {
        region.push(grid[i][j]);
      }
    }

    const conflict = region.some((num) => num === value);

    return conflict ? false : true;
  }

  solve(puzzleString) {
    const board = stringToBoard(puzzleString);

    function isSafe(board, row, col, num) {
      for (let d = 0; d < board.length; d++) {
        if (board[row][d] == num) {
          return false;
        }
      }

      for (let r = 0; r < board.length; r++) {
        if (board[r][col] == num) {
          return false;
        }
      }

      let sqrt = Math.floor(Math.sqrt(board.length));
      let boxRowStart = row - (row % sqrt);
      let boxColStart = col - (col % sqrt);

      for (let r = boxRowStart; r < boxRowStart + sqrt; r++) {
        for (let d = boxColStart; d < boxColStart + sqrt; d++) {
          if (board[r][d] == num) {
            return false;
          }
        }
      }

      return true;
    }

    function solveSudoku(board, n) {
      let row = -1;
      let col = -1;

      let isEmpty = true;
      for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
          if (board[i][j] == 0) {
            row = i;
            col = j;

            isEmpty = false;
            break;
          }
        }
        if (!isEmpty) {
          break;
        }
      }

      if (isEmpty) {
        return true;
      }

      for (let num = 1; num <= n; num++) {
        if (isSafe(board, row, col, num)) {
          board[row][col] = num;

          if (solveSudoku(board, n)) {
            return board;
          } else {
            board[row][col] = 0;
          }
        }
      }
      return false;
    }

    const solved = solveSudoku(board, board.length);
    return solved ? boardToString(solved) : false;
  }
}

module.exports = SudokuSolver;
