const express = require('express');
const router = express.Router();
const employeeController = require('../controllers/employee.controller');

// All Routes
router.post('/GetAllEmployee', employeeController.getPaginatedEmployees);
router.get('/GetBy/:id', employeeController.getEmployeeById);
router.post('/AddEmployee', employeeController.addEmployee);
router.put('/UpdateBy/:id', employeeController.updateEmployee);
router.delete('/DeleteBy/:id', employeeController.deleteEmployee);
router.post('/getCount', employeeController.getRoleCount);

module.exports = router;
