var dboperations = require('../../database/payroll_table');
const express = require('express');
const router = express.Router();

var config = require('../../database/dbconfig');
var sql = require('mssql');


 

router.get('/contractor_master_reports',(req, res)=>{
	res.render('reports/contractor_master_reports');
 
});




module.exports = { contMasterReports : router}