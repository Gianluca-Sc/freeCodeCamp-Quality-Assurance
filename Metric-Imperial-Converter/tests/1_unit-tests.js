const chai = require("chai");
let assert = chai.assert;
const ConvertHandler = require("../controllers/convertHandler.js");

let convertHandler = new ConvertHandler();

suite("Unit Tests", function () {
  test("convertHandler should correctly read a whole number input.", () => {
    assert.equal(convertHandler.getNum("4gal"), 4, "Num should be 4");
  });

  test("convertHandler should correctly read a decimal number input.", () => {
    assert.equal(convertHandler.getNum("4.5gal"), 4.5, "Num should be 4.5");
  });

  test("convertHandler should correctly read a fractional input.", () => {
    assert.equal(convertHandler.getNum("3/2gal"), 1.5, "Num should be 1.5");
  });

  test("convertHandler should correctly read a fractional input with a decimal.", () => {
    assert.equal(convertHandler.getNum("3.5/2gal"), 1.75, "Num should be 1.75");
  });

  test("convertHandler should correctly return an error on a double-fraction (i.e. 3/2/3).", () => {
    assert.isNotOk(convertHandler.getNum("3.5/2/2gal"));
  });

  test("convertHandler should correctly default to a numerical input of 1 when no numerical input is provided.", () => {
    assert.equal(convertHandler.getNum("gal"), 1, "Num should be 1");
  });

  test("convertHandler should correctly read each valid input unit.", () => {
    const lowerCaseInput = ["gal", "lbs", "mi", "l", "kg", "km"];
    const UpperCaseInput = lowerCaseInput.map((unit) => unit.toUpperCase());
    const inputs = [...lowerCaseInput, ...UpperCaseInput];
    inputs.forEach((input) => assert.isOk(convertHandler.getUnit(input)));
  });

  test("convertHandler should correctly return an error for an invalid input unit.", () => {
    assert.isNotOk(convertHandler.getUnit("m"));
  });

  test("convertHandler should return the correct return unit for each valid input unit.", () => {
    const units = {
      gal: "L",
      lbs: "kg",
      mi: "km",
      l: "gal",
      kg: "lbs",
      km: "mi",
    };
    Object.keys(units).forEach((unit) => {
      assert.equal(convertHandler.getReturnUnit(unit), units[unit]);
    });
  });

  test("convertHandler should correctly return the spelled-out string unit for each valid input unit.", () => {
    const units = ["gal", "lbs", "mi", "L", "kg", "km"];
    const expect = [
      "gallons",
      "pounds",
      "miles",
      "liters",
      "kilograms",
      "kilometers",
    ];
    units.forEach((unit, index) => {
      assert.equal(convertHandler.spellOutUnit(unit), expect[index]);
    });
  });

  suite("Function convertHandler.convert(num, unit)", () => {
    test("gal to L", () => {
      assert.approximately(convertHandler.convert(2, "gal"), 7.5708, 0.01);
    });

    test("L to gal", () => {
      assert.approximately(convertHandler.convert(5, "l"), 1.3208, 0.01);
    });

    test("mi to km", () => {
      assert.approximately(convertHandler.convert(10, "mi"), 16.09, 0.01);
    });

    test("km to mi", () => {
      assert.approximately(convertHandler.convert(8, "km"), 4.9709, 0.01);
    });

    test("lbs to kg", () => {
      assert.approximately(convertHandler.convert(5, "lbs"), 2.267, 0.01);
    });

    test("kg to lbs", () => {
      assert.approximately(convertHandler.convert(2, "kg"), 4.409, 0.01);
    });
  });
});
