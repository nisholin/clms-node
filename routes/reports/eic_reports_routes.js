var dboperations = require('../../database/payroll_table');
const express = require('express');
const router = express.Router();

var config = require('../../database/dbconfig');
var sql = require('mssql');


 

router.get('/eic_reports',(req, res)=>{
	res.render('reports/eic_reports');
});



module.exports = { eicReports : router}