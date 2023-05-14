"use strict";
const Issue = require("../models/issue");

module.exports = function (app) {
  app
    .route("/api/issues/:project")
    .get(async function (req, res) {
      try {
        let project = req.params.project;
        const queryObj = { project };
        Object.entries(req.query).forEach(
          ([key, value]) => (queryObj[key] = value)
        );

        const result = await Issue.find(queryObj).select({
          __v: 0,
          project: 0,
        });

        res.json(result);
      } catch (error) {
        console.log(error);
      }
    })

    .post(async function (req, res) {
      try {
        let project = req.params.project;
        const {
          issue_title,
          issue_text,
          created_by,
          assigned_to,
          status_text,
        } = req.body;

        if (!issue_title || !issue_text || !created_by)
          return res.json({ error: "required field(s) missing" });

        const result = await Issue.create({
          project,
          issue_title,
          issue_text,
          created_by,
          assigned_to,
          status_text,
        });

        res.json({
          assigned_to: result.assigned_to,
          status_text: result.status_text,
          open: result.open,
          _id: result.id,
          issue_title,
          issue_text,
          created_by,
          created_on: result.created_on,
          updated_on: result.updated_on,
        });
      } catch (error) {
        console.log(error);
      }
    })

    .put(async function (req, res) {
      try {
        const {
          _id,
          issue_title,
          issue_text,
          created_by,
          assigned_to,
          status_text,
          open,
        } = req.body;

        if (!_id) return res.json({ error: "missing _id" });
        if (
          !issue_title &&
          !issue_text &&
          !created_by &&
          !assigned_to &&
          !status_text &&
          !open
        ) {
          return res.json({ error: "no update field(s) sent", _id });
        }

        const result = await Issue.findById(_id).exec();
        if (!result) {
          return res.json({ error: "could not update", _id });
        }

        result.issue_title = issue_title || result.issue_title;
        result.issue_text = issue_text || result.issue_text;
        result.created_by = created_by || result.created_by;
        result.assigned_to = assigned_to || result.assigned_to;
        result.status_text = status_text || result.status_text;
        result.open = open || result.open;
        await result.save();

        res.json({ result: "successfully updated", _id });
      } catch (error) {
        console.log(error);
      }
    })

    .delete(async function (req, res) {
      try {
        const { _id } = req.body;
        if (!_id) return res.json({ error: "missing _id" });

        const result = await Issue.findByIdAndDelete(_id);

        if (!result) return res.json({ error: "could not delete", _id });

        res.json({ result: "successfully deleted", _id });
      } catch (error) {
        console.log(error);
      }
    });
};
