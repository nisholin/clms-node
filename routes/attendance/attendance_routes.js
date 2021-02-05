var dboperations = require('../../database/payroll_table');
const express = require('express');
const router = express.Router();

var config = require('../../database/dbconfig');
var sql = require('mssql');



router.get('/attendance',(req, res)=>{
	 var user_Id = req.session.userId, user_name = req.session.user_name;
	  if(user_Id == null)
    {
		message = 'Wrong Credentials.';
        res.render('login.ejs',{message: message});
		return;
    }
    else{
		
		res.render('attendance/attendance',{user_Id:user_Id,user_name:user_name});
    }
    });
	
    /* dboperations.getpayrollValues().then(result =>{                
    var data = result[0];
    res.render('pay_roll/pay_roll_generation',{data});
}) */
	


module.exports = { attendance:router}