'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const roles = require('../enums/Roles');
const findKeyBy = require('../utils/FindKeyByValue');

const CustomerSchema = new Schema({
    Name: { type: String, required: true, trim: true },
    Email: { type: String, required: true, index: true, unique: true },
    Password: { type: String, required: true},
    Roles: [{ type: String, required: true, enum: Object.keys(roles), default: findKeyBy.getKey(roles.customer)}],
    isActive: { type: Boolean, required: true, default: true },
});

module.exports = mongoose.model('Customer', CustomerSchema);