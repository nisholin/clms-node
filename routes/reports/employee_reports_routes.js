var dboperations = require('../../database/payroll_table');
const express = require('express');
const router = express.Router();

var config = require('../../database/dbconfig');
var sql = require('mssql');


 

router.get('/employee_reports_routes',(req, res)=>{
	res.render('reports/employee');
});



module.exports = { empReports : router} 