const mongoose= require("mongoose");
const employeeSchema = new mongoose.Schema({
    UserName: { type: String, require: true},
    password: { type: String, require: true},
    name: { type: String, require: true},
    salary: { type: Number, required: true },
    departmentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Department' },
    // adminId: { type: String },
    role: { type: Number, enum: [0, 1, 2], required: true }, // 0=Employee, 1=Admin, 2=SuperAdmin
    createdOn: { type: Date, default: Date.now },
    updatedOn: { type: Date, default: null },
      createdBy_Name: { type: String, required: true },
    updatedBy: { type: Number, default: null }
});
module.exports = mongoose.model("Employee",employeeSchema);