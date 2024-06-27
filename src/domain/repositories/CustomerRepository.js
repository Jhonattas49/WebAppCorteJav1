'use strict';

const mongoose = require('mongoose');
const Customer = mongoose.model('Customer'); 

exports.get = async () =>{
    const result= await Customer.find({});
    return result;
};

exports.create = (data) =>{
    var customer = new Customer(data);    
    return customer.save();
};