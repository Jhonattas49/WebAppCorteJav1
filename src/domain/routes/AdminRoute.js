'use strict';

const express = require('express');
const router = express.Router();
const controller = require('../../controllers/AdminController');
const validator = require('../../shared/validators/CustomerValidator');

//router.get('/admin',controller.get);

router.post('/login', validator.customerValidationRules(), controller.login);

router.put('/');
router.delete('/');

module.exports = router;