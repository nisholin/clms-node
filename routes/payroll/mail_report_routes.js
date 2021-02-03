var dboperations = require('../../database/payroll_table');
const express = require('express');
const router = express.Router();

var config = require('../../database/dbconfig');
var sql = require('mssql');


 

router.get('/mail_report',(req, res)=>{
	res.render('pay_roll/mail_report');
});



module.exports = { mailReport : router}