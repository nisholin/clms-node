var dboperations = require('../../database/payroll_table');
const express = require('express');
const router = express.Router();

var config = require('../../database/dbconfig');
var sql = require('mssql');


 

router.get('/a_in_out',(req, res)=>{
    /* dboperations.getpayrollValues().then(result =>{                
    var data = result[0];
    res.render('attendance/attendance_in_out');
}) */
	res.render('attendance/attendance_in_out');
});




module.exports = { attendanceinout : router}