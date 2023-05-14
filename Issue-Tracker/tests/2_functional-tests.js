const chaiHttp = require("chai-http");
const chai = require("chai");
const assert = chai.assert;
const server = require("../server");

chai.use(chaiHttp);
let deleteID;
suite("Functional Tests", function () {
  suite("POST requests", function () {
    test("Create an issue with every field: POST request to /api/issues/{project}", (done) => {
      chai
        .request(server)
        .keepOpen()
        .post("/api/issues/apitest")
        .send({
          issue_title: "title",
          issue_text: "lorem ipsum",
          created_by: "john doe",
          assigned_to: "jane doe",
          status_text: "pending",
        })
        .end((err, res) => {
          assert.equal(res.status, 200, "Response status should be 200");
          assert.equal(res.body.issue_title, "title");
          assert.equal(res.body.issue_text, "lorem ipsum");
          assert.equal(res.body.created_by, "john doe");
          assert.equal(res.body.assigned_to, "jane doe");
          assert.equal(res.body.status_text, "pending");
          assert.isBoolean(res.body.open);
          assert.isString(res.body.created_on);
          assert.isString(res.body.updated_on);
          deleteID = res.body._id;
          done();
        });
    });

    test("Create an issue with only required fields: POST request to /api/issues/{project}", (done) => {
      chai
        .request(server)
        .keepOpen()
        .post("/api/issues/apitest")
        .send({
          issue_title: "title",
          issue_text: "lorem ipsum",
          created_by: "john doe",
        })
        .end((err, res) => {
          assert.equal(res.status, 200, "Response status should be 200");
          assert.equal(res.body.issue_title, "title");
          assert.equal(res.body.issue_text, "lorem ipsum");
          assert.equal(res.body.created_by, "john doe");
          assert.equal(res.body.assigned_to, "");
          assert.equal(res.body.status_text, "");
          assert.equal(res.body.status_text, "");
          assert.isBoolean(res.body.open);
          assert.isString(res.body.created_on);
          assert.isString(res.body.updated_on);
          done();
        });
    });

    test("Create an issue with missing required fields: POST request to /api/issues/{project}", (done) => {
      chai
        .request(server)
        .keepOpen()
        .post("/api/issues/apitest")
        .send({
          issue_title: "title",
          issue_text: "lorem ipsum",
        })
        .end((err, res) => {
          assert.equal(res.status, 200, "Response status should be 200");
          assert.equal(res.body.error, "required field(s) missing");
          done();
        });
    });
  });
  suite("GET requests", function () {
    test("View issues on a project: GET request to /api/issues/{project}", (done) => {
      chai
        .request(server)
        .keepOpen()
        .get("/api/issues/apitest")
        .end((err, res) => {
          assert.equal(res.status, 200, "Response status should be 200");
          assert.isArray(res.body);
          done();
        });
    });

    test("View issues on a project with one filter: GET request to /api/issues/{project}", (done) => {
      chai
        .request(server)
        .keepOpen()
        .get("/api/issues/apitest")
        .query({ _id: "6460ff8af88673fc29475f3a" })
        .end((err, res) => {
          assert.equal(res.status, 200, "Response status should be 200");
          assert.equal(res.body[0].issue_title, "title");
          assert.equal(res.body[0].issue_text, "lorem ipsum");
          assert.equal(res.body[0].created_by, "john doe");
          assert.equal(res.body[0].assigned_to, "jane doe");
          assert.equal(res.body[0].status_text, "pending");
          assert.isBoolean(res.body[0].open);
          assert.isString(res.body[0].created_on);
          assert.isString(res.body[0].updated_on);
          done();
        });
    });

    test("View issues on a project with multiple filters: GET request to /api/issues/{project}", (done) => {
      chai
        .request(server)
        .keepOpen()
        .get("/api/issues/apitest")
        .query({ open: true, created_by: "john doe" })
        .end((err, res) => {
          assert.equal(res.status, 200, "Response status should be 200");
          assert.deepEqual(res.body[0], {
            _id: "6460ff8af88673fc29475f3a",
            issue_title: "title",
            issue_text: "lorem ipsum",
            created_by: "john doe",
            assigned_to: "jane doe",
            status_text: "pending",
            open: true,
            created_on: "2023-05-14T15:34:34.199Z",
            updated_on: "2023-05-14T15:34:34.199Z",
          });
          done();
        });
    });
  });
  suite("GET requests", function () {
    test("Update one field on an issue: PUT request to /api/issues/{project}", (done) => {
      chai
        .request(server)
        .keepOpen()
        .put("/api/issues/apitest")
        .send({ _id: "6460ffbce411ff07f2718fa9", issue_title: "new title" })
        .end((err, res) => {
          assert.equal(res.status, 200, "Response status should be 200");
          assert.equal(res.body.result, "successfully updated"),
            assert.equal(res.body._id, "6460ffbce411ff07f2718fa9");
          done();
        });
    });

    test("Update multiple fields on an issue: PUT request to /api/issues/{project}", (done) => {
      chai
        .request(server)
        .keepOpen()
        .put("/api/issues/apitest")
        .send({
          _id: "6460ffbce411ff07f2718fa9",
          issue_title: "new title",
          issue_text: "new text",
        })
        .end((err, res) => {
          assert.equal(res.status, 200, "Response status should be 200");
          assert.equal(res.body.result, "successfully updated"),
            assert.equal(res.body._id, "6460ffbce411ff07f2718fa9");
          done();
        });
    });

    test("Update an issue with missing _id: PUT request to /api/issues/{project}", (done) => {
      chai
        .request(server)
        .keepOpen()
        .put("/api/issues/apitest")
        .send({ issue_title: "new title" })
        .end((err, res) => {
          assert.equal(res.status, 200, "Response status should be 200");
          assert.equal(res.body.error, "missing _id");
          done();
        });
    });

    test("Update an issue with no fields to update: PUT request to /api/issues/{project}", (done) => {
      chai
        .request(server)
        .keepOpen()
        .put("/api/issues/apitest")
        .send({ _id: "6460ffbce411ff07f2718fa9" })
        .end((err, res) => {
          assert.equal(res.status, 200, "Response status should be 200");
          assert.equal(res.body.error, "no update field(s) sent");
          done();
        });
    });

    test("Update an issue with an invalid _id: PUT request to /api/issues/{project}", (done) => {
      chai
        .request(server)
        .keepOpen()
        .put("/api/issues/apitest")
        .send({ _id: "6260ffbce411ff07f2718fa9", issue_title: "new title" })
        .end((err, res) => {
          assert.equal(res.status, 200, "Response status should be 200");
          assert.equal(res.body.error, "could not update");
          done();
        });
    });
  });
  suite("DELETE requests", function () {
    test("Delete an issue: DELETE request to /api/issues/{project}", (done) => {
      chai
        .request(server)
        .keepOpen()
        .delete("/api/issues/apitest")
        .send({ _id: deleteID })
        .end((err, res) => {
          assert.equal(res.status, 200, "Response status should be 200");
          assert.equal(res.body.result, "successfully deleted");
          done();
        });
    });

    test("Delete an issue with an invalid _id: DELETE request to /api/issues/{project}", (done) => {
      chai
        .request(server)
        .keepOpen()
        .delete("/api/issues/apitest")
        .send({ _id: deleteID })
        .end((err, res) => {
          assert.equal(res.status, 200, "Response status should be 200");
          assert.equal(res.body.error, "could not delete");
          done();
        });
    });

    test("Delete an issue with missing _id: DELETE request to /api/issues/{project}", (done) => {
      chai
        .request(server)
        .keepOpen()
        .delete("/api/issues/apitest")
        .send({})
        .end((err, res) => {
          assert.equal(res.status, 200, "Response status should be 200");
          assert.equal(res.body.error, "missing _id");
          done();
        });
    });
  });
});
