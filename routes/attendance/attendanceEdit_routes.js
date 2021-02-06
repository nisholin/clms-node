var dboperations = require('../../database/payroll_table');
const express = require('express');
const router = express.Router();

var config = require('../../database/dbconfig');
var sql = require('mssql');


 

router.get('/a_edit',(req, res)=>{
	 var user_Id = req.session.userId, user_name = req.session.user_name;
	  if(user_Id == null)
    {
		message = 'Wrong Credentials.';
        res.render('login.ejs',{message: message});
		return;
    }
    else{
		
        res.render('attendance/attendance_edit',{user_Id:user_Id,user_name:user_name});
    }
    });

/*
router.post('/attendance/attendance_edit',(req,res,next)=>{
    var late_commers = req.body.late_commers;
    var payroll_month = req.body.payroll_month;
    var date = req.body.date;

    console.log(late_commers);
	  console.log(payroll_month);
	  console.log(date);
	
    async function getattendanceeditValues(){
        try{
            let pool = await sql.connect(config);
             await pool.request().query("insert into (late_commers,payroll_month,date) 
              values ('"+late_commers+"','"+payroll_month+"','"+date+"')",(req,res)=>{
                 console.log("successfully inserted");
             });
            //return products.recordsets;
        }
        catch(error){
            console.log(error);
        }
    }
    getattendanceeditValues();
	 res.redirect("/attendanceedit")
});
*/ 



module.exports = { attendanceedit : router}