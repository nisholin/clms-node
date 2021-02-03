var dboperations = require('../../database/payroll_table');
const express = require('express');
const router = express.Router();

var config = require('../../database/dbconfig');
var sql = require('mssql');



router.get('/attendance',(req, res)=>{
    /* dboperations.getpayrollValues().then(result =>{                
    var data = result[0];
    res.render('pay_roll/pay_roll_generation',{data});
}) */
	res.render('attendance/attendance');
});



module.exports = { attendance:router}