var dboperations = require('../../database/payroll_table');
const express = require('express');
const router = express.Router();

var config = require('../../database/dbconfig');
var sql = require('mssql');


 

router.get('/in_out_reports',(req, res)=>{
	res.render('reports/in_out');
});



module.exports = { inOutReports : router}