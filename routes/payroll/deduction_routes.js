var dboperations = require('../../database/payroll_table');
const express = require('express');
const router = express.Router();

var config = require('../../database/dbconfig');
var sql = require('mssql');


 

router.get('/deduction',(req, res)=>{
	res.render('pay_roll/deduction');
});



module.exports = { deduction : router}