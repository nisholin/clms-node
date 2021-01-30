const express = require('express');
const router = express.Router();

var config = require('../../database/dbconfig');
var sql = require('mssql');





router.get('/pay_roll_generation',(req, res)=>{
    res.render('pay_roll/pay_roll_generation');
});


module.exports = {
    payroll:router    
}