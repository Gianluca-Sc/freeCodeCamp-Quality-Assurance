const chai = require("chai");
const assert = chai.assert;

const Solver = require("../controllers/sudoku-solver.js");
const { puzzlesAndSolutions } = require("../controllers/puzzle-strings.js");
let solver = new Solver();

console.log();
suite("Unit Tests", () => {
  test("Logic handles a valid puzzle string of 81 characters", () => {
    assert.isTrue(solver.validate(puzzlesAndSolutions[0][0]));
  });

  test("Logic handles a puzzle string with invalid characters (not 1-9 or .)", () => {
    let puzzle =
      "A.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37G";
    assert.equal(solver.validate(puzzle).error, "Invalid characters in puzzle");
  });

  test("Logic handles a puzzle string that is not 81 characters in length", () => {
    let puzzle =
      "..5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.88";
    assert.equal(
      solver.validate(puzzle).error,
      "Expected puzzle to be 81 characters long"
    );
  });

  test("Logic handles a valid row placement", () => {
    let puzzle = puzzlesAndSolutions[0][0];
    assert.isTrue(solver.checkRowPlacement(puzzle, "A", 2, 3));
  });

  test("Logic handles an invalid row placement", () => {
    let puzzle = puzzlesAndSolutions[0][0];
    assert.isNotTrue(solver.checkRowPlacement(puzzle, "A", 2, 8));
  });

  test("Logic handles a valid column placement", () => {
    let puzzle = puzzlesAndSolutions[0][0];
    assert.isTrue(solver.checkColPlacement(puzzle, "A", 2, 3));
  });

  test("Logic handles an invalid column placement", () => {
    let puzzle = puzzlesAndSolutions[0][0];
    assert.isNotTrue(solver.checkColPlacement(puzzle, "A", 2, 6));
  });

  test("Logic handles a valid region (3x3 grid) placement", () => {
    let puzzle = puzzlesAndSolutions[0][0];
    assert.isTrue(solver.checkRegionPlacement(puzzle, "A", 2, 3));
  });

  test("Logic handles an invalid region (3x3 grid) placement", () => {
    let puzzle = puzzlesAndSolutions[0][0];
    assert.isNotTrue(solver.checkRegionPlacement(puzzle, "A", 2, 1));
  });

  test("Valid puzzle strings pass the solver", () => {
    let puzzle = puzzlesAndSolutions[0][0];
    assert.isOk(solver.solve(puzzle));
  });

  test("Invalid puzzle strings fail the solver", () => {
    let puzzle = puzzlesAndSolutions[0][0] + "0";
    assert.isNotTrue(solver.solve(puzzle));
  });

  test("Solver returns the expected solution for an incomplete puzzle", () => {
    let puzzle = puzzlesAndSolutions[0][0];
    let solution = puzzlesAndSolutions[0][1];
    assert.equal(solver.solve(puzzle), solution);
  });
});
