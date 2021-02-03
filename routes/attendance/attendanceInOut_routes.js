var dboperations = require('../../database/payroll_table');
const express = require('express');
const router = express.Router();

var config = require('../../database/dbconfig');
var sql = require('mssql');


 

router.get('/attendance_in_out',(req, res)=>{
    dboperations.getpayrollValues().then(result =>{                
    var data = result[0];
    res.render('attendance/attendance_in_out',{data});
})
	//res.render('menu_master/engineer');
});




module.exports = { attendanceinout : router}