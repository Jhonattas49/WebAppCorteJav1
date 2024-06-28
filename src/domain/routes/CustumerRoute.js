'use strict';

const express = require('express');
const router = express.Router();
const controller = require('../../controllers/CustomerController');
const validator = require('../../shared/validators/CustomerValidator');

router.get('/',controller.get);

router.post('/', validator.customerValidationRules(), controller.post);

router.put('/');
router.delete('/');

module.exports = router;