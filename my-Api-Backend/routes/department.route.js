const express = require('express');
const router = express.Router();
const controller = require('../controllers/department.controller');
const { verifyToken } = require('../middlewares/auth.middleware');

router.post('/', verifyToken, controller.addDepartment);
router.get('/', verifyToken, controller.getAllDepartments);
router.get('/GetDepartmentBy/:id', verifyToken, controller.getDepartmentById);
router.put('/', verifyToken, controller.updateDepartment);
router.delete('/:id', verifyToken, controller.deleteDepartment);
router.post('/GetallDepartments', verifyToken, controller.paginateDepartments);
router.get('/GetEmployeesUnderDepartment/:id', verifyToken, controller.getEmployeesUnderDepartment);


module.exports = router;