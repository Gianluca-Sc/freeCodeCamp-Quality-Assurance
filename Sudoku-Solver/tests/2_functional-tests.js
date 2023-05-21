const chai = require("chai");
const chaiHttp = require("chai-http");
const assert = chai.assert;
const server = require("../server");
const { puzzlesAndSolutions } = require("../controllers/puzzle-strings.js");
chai.use(chaiHttp);

suite("Functional Tests", () => {
  suite("/api/solve", () => {
    test("Solve a puzzle with valid puzzle string: POST request to /api/solve", (done) => {
      chai
        .request(server)
        .keepOpen()
        .post("/api/solve")
        .send({ puzzle: puzzlesAndSolutions[0][0] })
        .end((err, res) => {
          assert.equal(res.status, 200);
          assert.equal(res.body.solution, puzzlesAndSolutions[0][1]);
          done();
        });
    });

    test("Solve a puzzle with missing puzzle string: POST request to /api/solve", (done) => {
      chai
        .request(server)
        .keepOpen()
        .post("/api/solve")
        .send({})
        .end((err, res) => {
          assert.equal(res.status, 200);
          assert.equal(res.body.error, "Required field missing");
          done();
        });
    });

    test("Solve a puzzle with invalid characters: POST request to /api/solve", (done) => {
      let invalidString =
        "A.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37A";
      chai
        .request(server)
        .keepOpen()
        .post("/api/solve")
        .send({ puzzle: invalidString })
        .end((err, res) => {
          assert.equal(res.status, 200);
          assert.equal(res.body.error, "Invalid characters in puzzle");
          done();
        });
    });

    test("Solve a puzzle with incorrect length: POST request to /api/solve", (done) => {
      chai
        .request(server)
        .keepOpen()
        .post("/api/solve")
        .send({ puzzle: puzzlesAndSolutions[0][0] + "..5" })
        .end((err, res) => {
          assert.equal(res.status, 200);
          assert.equal(
            res.body.error,
            "Expected puzzle to be 81 characters long"
          );
          done();
        });
    });

    test("Solve a puzzle that cannot be solved: POST request to /api/solve", (done) => {
      let puzzle =
        "1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.38.";
      chai
        .request(server)
        .keepOpen()
        .post("/api/solve")
        .send({ puzzle })
        .end((err, res) => {
          assert.equal(res.status, 200);
          assert.equal(res.body.error, "Puzzle cannot be solved");
          done();
        });
    });
  });

  suite("/api/check", () => {
    test("Check a puzzle placement with all fields: POST request to /api/check", (done) => {
      chai
        .request(server)
        .keepOpen()
        .post("/api/check")
        .send({ puzzle: puzzlesAndSolutions[0][0], coordinate: "A2", value: 3 })
        .end((err, res) => {
          assert.equal(res.status, 200);
          assert.isTrue(res.body.valid);
          done();
        });
    });

    test("Check a puzzle placement with single placement conflict: POST request to /api/check", (done) => {
      chai
        .request(server)
        .keepOpen()
        .post("/api/check")
        .send({ puzzle: puzzlesAndSolutions[0][0], coordinate: "A2", value: 4 })
        .end((err, res) => {
          assert.equal(res.status, 200);
          assert.isNotTrue(res.body.valid);
          assert.equal(res.body.conflict.length, 1);
          done();
        });
    });

    test("Check a puzzle placement with multiple placement conflicts: POST request to /api/check", (done) => {
      chai
        .request(server)
        .keepOpen()
        .post("/api/check")
        .send({ puzzle: puzzlesAndSolutions[0][0], coordinate: "B2", value: 7 })
        .end((err, res) => {
          assert.equal(res.status, 200);
          assert.isNotTrue(res.body.valid);
          assert.isAtLeast(res.body.conflict.length, 2);
          done();
        });
    });

    test("Check a puzzle placement with all placement conflicts: POST request to /api/check", (done) => {
      chai
        .request(server)
        .keepOpen()
        .post("/api/check")
        .send({ puzzle: puzzlesAndSolutions[0][0], coordinate: "A2", value: 2 })
        .end((err, res) => {
          assert.equal(res.status, 200);
          assert.isNotTrue(res.body.valid);
          assert.isAtLeast(res.body.conflict.length, 3);
          done();
        });
    });

    test("Check a puzzle placement with missing required fields: POST request to /api/check", (done) => {
      chai
        .request(server)
        .keepOpen()
        .post("/api/check")
        .send({ puzzle: puzzlesAndSolutions[0][0], value: 2 })
        .end((err, res) => {
          assert.equal(res.status, 200);
          assert.equal(res.body.error, "Required field(s) missing");
          done();
        });
    });

    test("Check a puzzle placement with invalid characters: POST request to /api/check", (done) => {
      let invalidString =
        "A.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37A";
      chai
        .request(server)
        .keepOpen()
        .post("/api/check")
        .send({ puzzle: invalidString, coordinate: "A2", value: 2 })
        .end((err, res) => {
          assert.equal(res.status, 200);
          assert.equal(res.body.error, "Invalid characters in puzzle");
          done();
        });
    });

    test("Check a puzzle placement with incorrect length: POST request to /api/check", (done) => {
      chai
        .request(server)
        .keepOpen()
        .post("/api/check")
        .send({
          puzzle: puzzlesAndSolutions[0][0] + "..8",
          coordinate: "A2",
          value: 2,
        })
        .end((err, res) => {
          assert.equal(res.status, 200);
          assert.equal(
            res.body.error,
            "Expected puzzle to be 81 characters long"
          );
          done();
        });
    });

    test("Check a puzzle placement with invalid placement coordinate: POST request to /api/check", (done) => {
      chai
        .request(server)
        .keepOpen()
        .post("/api/check")
        .send({
          puzzle: puzzlesAndSolutions[0][0],
          coordinate: "W22",
          value: 2,
        })
        .end((err, res) => {
          assert.equal(res.status, 200);
          assert.equal(res.body.error, "Invalid coordinate");
          done();
        });
    });

    test("Check a puzzle placement with invalid placement value: POST request to /api/check", (done) => {
      chai
        .request(server)
        .keepOpen()
        .post("/api/check")
        .send({
          puzzle: puzzlesAndSolutions[0][0],
          coordinate: "A2",
          value: 28,
        })
        .end((err, res) => {
          assert.equal(res.status, 200);
          assert.equal(res.body.error, "Invalid value");
          done();
        });
    });
  });
});
