'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const roles = require('../enums/Roles');

const CustomerSchema = new Schema({
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, index: true, unique: true },
    password: { type: String, required: true},
    mobilePhone: {type: String, required: true},
    roles: [{ type: String, enum: Object.keys(roles)}],
    isActive: { type: Boolean, required: true, default: true },
});

module.exports = mongoose.model('Customer', CustomerSchema);