const getFirstLetter = (input) => input.match(/[a-z]/i);

function ConvertHandler() {
  this.getNum = function (input) {
    const firstLetter = getFirstLetter(input);
    const initNum = input.substring(0, input.indexOf(firstLetter)) || 1;

    // check if initNum is Whole number, decimal number, fraction, fraction with decimal numbers
    if (!/^[0-9]*(\.[0-9]+)?(\/[0-9]+\.?)?[0-9]*$/g.test(initNum)) {
      return undefined;
    }

    if (/\//.test(initNum)) {
      const tempInitNum = initNum.split("/");
      return tempInitNum[0] / tempInitNum[1];
    } else {
      return +initNum;
    }
  };

  this.getUnit = function (input) {
    const firstLetter = getFirstLetter(input);
    let initUnit = input.substring(input.indexOf(firstLetter)).toLowerCase();

    if (!["gal", "l", "km", "mi", "kg", "lbs"].includes(initUnit)) {
      return undefined;
    }

    return initUnit === "l" ? "L" : initUnit;
  };

  this.getReturnUnit = function (initUnit) {
    const units = {
      gal: "L",
      lbs: "kg",
      mi: "km",
      l: "gal",
      kg: "lbs",
      km: "mi",
    };

    return units[initUnit.toLowerCase()];
  };

  this.spellOutUnit = function (unit) {
    const units = {
      gal: "gallons",
      lbs: "pounds",
      mi: "miles",
      L: "liters",
      kg: "kilograms",
      km: "kilometers",
    };
    return units[unit];
  };

  this.convert = function (initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;

    switch (initUnit.toLowerCase()) {
      case "gal":
        result = initNum * galToL;
        break;
      case "l":
        result = initNum / galToL;
        break;
      case "lbs":
        result = initNum * lbsToKg;
        break;
      case "kg":
        result = initNum / lbsToKg;
        break;
      case "mi":
        result = initNum * miToKm;
        break;
      case "km":
        result = initNum / miToKm;
        break;
      default:
        result = undefined;
        break;
    }

    return +result.toFixed(5);
  };

  this.getString = function (initNum, initUnit, returnNum, returnUnit) {
    return `${initNum} ${this.spellOutUnit(
      initUnit
    )} converts to ${returnNum} ${this.spellOutUnit(returnUnit)}`;
  };
}

module.exports = ConvertHandler;
