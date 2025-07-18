const Employee = require('../models/employee.model');

// let currentEmployeeId = 1000;
// async function getNextEmployeeId() {
//   const latest = await Employee.findOne().sort({ id: -1 });
//   return latest ? latest.id + 1 : currentEmployeeId;
// }
exports.getPaginatedEmployees = async (req, res) => {
  try {
    const { filterOn, filterQuery, sortBy, isAscending, pageNumber, pageSize, additionalSearch, startDate, endDate } = req.body;

    let query = {};
    if (filterOn && filterQuery) query[filterOn] = filterQuery;
    if (additionalSearch) query.name = { $regex: additionalSearch, $options: 'i' };
    if (startDate && endDate) {
      query.createdOn = {
        $gte: new Date(startDate),
        $lte: new Date(endDate)
      };
    }
    const total = await Employee.countDocuments(query);
    const safePage = Math.max(1, parseInt(pageNumber) || 1);
    const safeSize = Math.max(1, parseInt(pageSize) || 10);
    const data = await Employee.find(query)
      .sort(sortBy ? { [sortBy]: isAscending ? 1 : -1 } : {})
      .skip((safePage - 1) * safeSize)
      .limit(safeSize);
    res.status(200).json({
      success: true,
      message: 'Employee list fetched',
      totalEntriesCount: total,
      data
    });
  } catch (error) {
    console.error("Internal Server Error in getPaginatedEmployees:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};
exports.getEmployeeById = async (req, res) => {
  try {
    const employee = await Employee.findOne({ id: req.params.id });
    if (!employee) return res.status(404).json({ success: false, message: 'Employee not found' });

    res.status(200).json({ success: true, status: 200, message: 'Found', data: employee });
  } catch (err) {
    res.status(500).json({ success: false, status: 500, message: err.message });
  }
};
exports.addEmployee = async (req, res) => {
  try {
    const newId = await getNextEmployeeId();
    const employee = new Employee({ ...req.body, id: newId, createdOn: new Date() });
    await employee.save();

    const total = await Employee.countDocuments();

    res.status(201).json({ success: true, message: 'Employee added', data: newId, totalEntriesCount: total });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
exports.updateEmployee = async (req, res) => {
  try {
    const updated = await Employee.findOneAndUpdate(
      { id: req.params.id },
      { ...req.body, updatedOn: new Date() },
      { new: true }
    );

    if (!updated) return res.status(404).json({ success: false, message: 'Employee not found' });

    res.status(200).json({ success: true, status: 200, message: 'Updated', data: updated.id });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
exports.deleteEmployee = async (req, res) => {
  try {
    const result = await Employee.findOneAndDelete({ id: req.params.id });
    if (!result) return res.status(404).json({ success: false, message: 'Employee not found' });

    res.status(200).json({ success: true, status: 200, message: 'Deleted', data: true });
  } catch (err) {
    res.status(500).json({ success: false, status: 500, message: err.message });
  }
};
exports.getRoleCount = async (req, res) => {
  try {
    const role = parseInt(req.query.role);
    const count = await Employee.countDocuments({ role });
    res.status(200).json({ success: true, message: 'Role count', data: count });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

