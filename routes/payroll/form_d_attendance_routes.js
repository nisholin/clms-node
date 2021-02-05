var dboperations = require('../../database/payroll_table');
const express = require('express');
const router = express.Router();

var config = require('../../database/dbconfig');
var sql = require('mssql');


 

router.get('/form_d',(req, res)=>{
	res.render('pay_roll/form_d_attendance');
});



module.exports = { formDAttendance : router}