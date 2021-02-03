var dboperations = require('../../database/payroll_table');
const express = require('express');
const router = express.Router();

var config = require('../../database/dbconfig');
var sql = require('mssql');


 

router.get('/passrequest_two',(req, res)=>{
	res.render('pass/pass_request_2');
});



module.exports = { passrequesttwo : router}