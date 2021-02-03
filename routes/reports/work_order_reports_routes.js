var dboperations = require('../../database/payroll_table');
const express = require('express');
const router = express.Router();

var config = require('../../database/dbconfig');
var sql = require('mssql');


 

router.get('/work_order_reports',(req, res)=>{
	res.render('reports/work_order');
});



module.exports = { workOrderReports : router}