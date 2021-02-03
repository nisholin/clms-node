var dboperations = require('../../database/payroll_table');
const express = require('express');
const router = express.Router();

var config = require('../../database/dbconfig');
var sql = require('mssql');


 

router.get('/passrequest_one',(req, res)=>{
	res.render('pass/pass_request_1');
});



module.exports = { passrequestone : router}