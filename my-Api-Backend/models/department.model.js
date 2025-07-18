const mongoose = require("mongoose");

const departmentSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  createdBy_Name: { type: String, required: true },
  createdOn: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Department", departmentSchema);
