const express = require('express');
const router = express.Router();
const { login } = require('../controllers/auth.controller');

router.post('/Login', login);

module.exports = router;


