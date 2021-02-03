var dboperations = require('../../database/payroll_table');
const express = require('express');
const router = express.Router();

var config = require('../../database/dbconfig');
var sql = require('mssql');


 

router.get('/print_pass',(req, res)=>{
	res.render('pass/print_pass');
});



module.exports = { printpass : router}