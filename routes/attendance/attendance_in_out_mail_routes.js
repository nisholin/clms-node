const express = require('express');
const router = express.Router();
var dboperations = require('../../database/pass/pass_req_table_1');

var config = require('../../database/dbconfig');
var sql = require('mssql');



router.get('/a_in_out_mail',(req,res)=>{
    var user_Id = req.session.userId, user_name = req.session.user_name;
	if (user_Id == null) {
		message = 'Wrong Credentials.';
		res.render('login.ejs', { message: message });
		return;
	}
	else {
        res.render('attendance/attendance_in_out_mail',{user_Id: user_Id, user_name: user_name});
    }
});








module.exports = {
    attendanceinoutmail : router
}