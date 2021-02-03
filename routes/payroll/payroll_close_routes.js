var dboperations = require('../../database/payroll_table');
const express = require('express');
const router = express.Router();

var config = require('../../database/dbconfig');
var sql = require('mssql');


 

router.get('/pay_roll_close',(req, res)=>{
	res.render('pay_roll/pay_roll_close');
});



module.exports = { payRollClose : router}