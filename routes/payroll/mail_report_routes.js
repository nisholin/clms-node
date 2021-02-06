var dboperations = require('../../database/payroll_table');
const express = require('express');
const router = express.Router();

var config = require('../../database/dbconfig');
var sql = require('mssql');


 

router.get('/mail_report',(req, res)=>{
	var user_Id = req.session.userId, user_name = req.session.user_name;
	if(user_Id == null)
  {
	  message = 'Wrong Credentials.';
	  res.render('login.ejs',{message: message});
	  return;
  }
  else{
	res.render('pay_roll/mail_report',{user_Id:user_Id,user_name:user_name});
	}
});

/* 
router.post('/pay_roll/mail_reportnew',(req,res,next)=>{
    var contractor = req.body.contractor;
    var employee = req.body.employee;
    var month = req.body.month;
 
    console.log(contractor_code);
	console.log(employee);
	console.log(month);
	
    async function getmailReportValues(){
        try{
            let pool = await sql.connect(config);
             await pool.request().query("insert into (contractor_code,employee,month) 
              values ('"+contractor_code+"','"+employee+"','"+month+"')",(req,res)=>{
                 console.log("successfully inserted");
             });
            //return products.recordsets;
        }
        catch(error){
            console.log(error);
        }
    }
    getmailReportValues();
	 res.redirect("/mailReport")
});
*/ 


module.exports = { mailReport : router}