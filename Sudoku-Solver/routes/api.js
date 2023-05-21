"use strict";

const SudokuSolver = require("../controllers/sudoku-solver.js");

module.exports = function (app) {
  let solver = new SudokuSolver();

  app.route("/api/check").post((req, res) => {
    const { puzzle, coordinate, value } = req.body;
    const conflicts = [];

    if (!coordinate || !value || !puzzle)
      return res.json({ error: "Required field(s) missing" });

    if (!/^[a-i][1-9]$/i.test(coordinate)) {
      return res.json({ error: "Invalid coordinate" });
    }

    if (!/^[1-9]$/.test(value)) {
      return res.json({ error: "Invalid value" });
    }

    const validPuzzle = solver.validate(puzzle);
    if (validPuzzle.hasOwnProperty("error")) {
      return res.json({ error: validPuzzle.error });
    }

    const checkRow = solver.checkRowPlacement(
      puzzle,
      coordinate[0],
      coordinate[1],
      value
    );
    if (!checkRow) conflicts.push("row");

    const checkCol = solver.checkColPlacement(
      puzzle,
      coordinate[0],
      coordinate[1],
      value
    );
    if (!checkCol) conflicts.push("column");

    const checkRegion = solver.checkRegionPlacement(
      puzzle,
      coordinate[0],
      coordinate[1],
      value
    );
    if (!checkRegion) conflicts.push("region");

    if (conflicts.length >= 1) {
      return res.json({ valid: false, conflict: conflicts });
    }

    res.json({ valid: true });
  });

  app.route("/api/solve").post((req, res) => {
    const { puzzle } = req.body;
    if (!puzzle) return res.json({ error: "Required field missing" });

    const validate = solver.validate(puzzle);
    if (validate.error) return res.json({ error: validate.error });

    const solved = solver.solve(puzzle);
    if (!solved) return res.json({ error: "Puzzle cannot be solved" });
    res.json({ solution: solved });
  });
};
