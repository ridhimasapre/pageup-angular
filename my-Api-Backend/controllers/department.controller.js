const Department = require("../models/department.model");
const Employee = require('../models/employee.model');

exports.addDepartment = async (req, res) => {
  const { name } = req.body;
  const createdBy_Name = req.user.username;

  const exists = await Department.findOne({ name });
  if (exists)
    return res
      .status(409)
      .json({ success: false, message: "Department already exists" });

  const newDepartment = await Department.create({ name, createdBy_Name });
  res
    .status(201)
    .json({ success: true, message: "Department Added", data: newDepartment._id });
};

exports.getAllDepartments = async (req, res) => {
  const departments = await Department.find().sort({ createdOn: -1 });

  const mapped = departments.map((dep) => ({
    id: dep._id.toString(), // convert ObjectId to string
    name: dep.name,
    createdBy_Name: dep.createdBy_Name,
    createdOn: dep.createdOn,
  }));
  res.status(200).json({ success: true,
     message: "Departments fetched successfully",
      data: mapped });
};

exports.getDepartmentById = async (req, res) => {
  const dept = await Department.findById(req.params.id);
  if (!dept)
    return res.status(404).json({ success: false, message: "Not found" });
  res.status(200).json({ success: true, data: dept });
};
exports.updateDepartment = async (req, res) => {
  const { id, name } = req.body;
  if (!id) {
    return res
      .status(400)
      .json({ success: false, message: "Id is required " });
  }
  try {
    const dept = await Department.findByIdAndUpdate(
      id, // _id
      { name: name },
      { new: true }
    );
    if (!dept) {
      return res
        .status(404)
        .json({ success: false, message: "Department not found" });
    }

    return res.status(200).json({ success: true, data: dept });
  } catch (err) {
    console.error("Update error:", err);
    return res.status(500).json({ success: false, message: "Server Error" });
  }
};
exports.deleteDepartment = async (req, res) => {
  const deleted = await Department.findByIdAndDelete(req.params.id);
  if (!deleted)
    return res.status(404).json({ success: false, message: "Not found" });
  res.status(200).json({ success: true, data: true });
};
exports.paginateDepartments = async (req, res) => {
  try {
    let {
      filterOn = "name",
      filterQuery = "",
      sortBy = "createdOn",
      isAscending = false,
      pageNumber = 1,
      pageSize = 10,
      startDate,
      endDate
    } = req.body;

    const query = {};
    if (filterOn && filterQuery)
      query[filterOn] = { $regex: filterQuery, $options: "i" };
    if (startDate && endDate)
      query.createdOn = { $gte: new Date(startDate), $lte: new Date(endDate) };

    const sortField = ["name", "createdOn", "createdBy_Name"].includes(sortBy)
      ? sortBy : "createdOn";

    //  Fetch all
    const fetchAll = pageNumber <= 0 || pageSize <= 0;

    const cursor = Department.find(query).sort({ [sortField]: isAscending ? 1 : -1 });
    const data = fetchAll
      ? await cursor
      : await cursor.skip((pageNumber - 1) * pageSize).limit(pageSize);

    const totalEntriesCount = await Department.countDocuments(query);

    res.status(200).json({
      success: true,
      message: fetchAll ? "All departments" : "Paginated data",
      totalEntriesCount,
      data: data.map(dep => ({
        id: dep._id.toString(),    //  ObjectId as string
        name: dep.name,
        createdBy_Name: dep.createdBy_Name,
        createdOn: dep.createdOn
      }))
    });
  } catch (err) {
    console.error("[paginateDepartments]", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
exports.getEmployeesUnderDepartment = async (req, res) => {
  const deptId = req.params.id;
  console.log("deptid to batao yrr",dept)
 if (!deptId || typeof deptId !== 'string') {
    return res.status(400).json({ success: false, message: 'Invalid department id' });
  }
  
  try {
    const employees = await Employee.find({
      departmentId: deptId,
      role: { $in: [1, 2] }           // only Admin & SuperAdmin
    });

    res.status(200).json({
      success: true,
      data: employees.map(e => ({
        id: e._id,
        name: e.name,
        role: e.role
      }))
    });
  } catch (err) {
    console.error('[GetEmployeesUnderDepartment]', err.message);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

