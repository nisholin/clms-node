var dboperations = require('../../database/payroll_table');
const express = require('express');
const router = express.Router();

var config = require('../../database/dbconfig');
var sql = require('mssql');


 

router.get('/eic_reports',(req, res)=>{
	var user_Id = req.session.userId, user_name = req.session.user_name;
	res.render('reports/eic_reports',{user_Id:user_Id,user_name:user_name});
});



module.exports = { eicReports : router}