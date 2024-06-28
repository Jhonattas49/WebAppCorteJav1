'use strict';

const mongoose = require('mongoose');
const Customer = mongoose.model('Customer'); 
const comparePassword= require('../services/AuthServices');

exports.get = async () =>{
    const result= await Customer.find({});
    return result;
};

exports.create = (data) =>{
    var customer = new Customer(data);    
    return customer.save();
};

//
exports.authenticate = async (data) => {
    const customer = await Customer.findOne({email : data.email});
    const result = comparePassword.comparePassword(data.password,customer.password)?customer:false;
    return result;
};
