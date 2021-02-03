var dboperations = require('../../database/payroll_table');
const express = require('express');
const router = express.Router();

var config = require('../../database/dbconfig');
var sql = require('mssql');


 

router.get('/work_order_billing',(req, res)=>{
	res.render('pay_roll/work_order_billing');
});



module.exports = { workOrderBill : router}