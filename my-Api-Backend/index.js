const mongoose = require("mongoose");
const express = require("express");
const app = express();
require("dotenv").config();
const employeeRoutes = require('./routes/employee.route');


mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
require("./config/db");
const cors = require("cors");
const authRoutes = require("./routes/auth.route");
const departmentRoutes = require("./routes/department.route");

app.use(express.json());
app.use(cors());
app.use("/api/Auth", authRoutes);
app.use("/api/Department", departmentRoutes);
app.use('/api/Employees', employeeRoutes);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(` Server is running on http://localhost:${PORT}`);
});
