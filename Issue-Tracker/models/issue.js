const mongoose = require("mongoose");

const issueSchema = new mongoose.Schema(
  {
    project: { type: String },
    issue_title: { type: String, required: true },
    issue_text: { type: String, required: true },
    created_by: { type: String, required: true, maxLength: 50 },
    assigned_to: { type: String, maxLength: 50, default: "" },
    status_text: { type: String, default: "" },
    open: { type: Boolean, default: true },
  },
  {
    timestamps: {
      createdAt: "created_on",
      updatedAt: "updated_on",
    },
  }
);

module.exports = mongoose.model("Issue", issueSchema);
