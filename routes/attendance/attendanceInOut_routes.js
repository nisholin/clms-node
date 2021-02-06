var dboperations = require('../../database/payroll_table');
const express = require('express');
const router = express.Router();

var config = require('../../database/dbconfig');
var sql = require('mssql');


 

router.get('/a_in_out',(req, res)=>{
	var user_Id = req.session.userId, user_name = req.session.user_name;
	  if(user_Id == null)
    {
		message = 'Wrong Credentials.';
        res.render('login.ejs',{message: message});
		return;
    }
    else{
		
		res.render('attendance/attendance_in_out',{user_Id:user_Id,user_name:user_name});
    }
	});

/*
router.post('/attendance/attendance_in_outnew',(req,res,next)=>{
    var contractor = req.body.contractor;
  var from_date = req.body.from_date;
  var to_date = req.body.to_date;
  
    console.log(contractor);
	  console.log(from_date);
	  console.log(to_date);
	
    async function getattendanceinoutValues(){
        try{
            let pool = await sql.connect(config);
             await pool.request().query("insert into (contractor,from_date,to_date) 
              values ('"+contractor+"','"+from_date+"','"+to_date+"')",(req,res)=>{
                 console.log("successfully inserted");
             });
            //return products.recordsets;
        }
        catch(error){
            console.log(error);
        }
    }
    getattendanceinoutValues();
	 res.redirect("/attendanceinout")
});
*/ 



module.exports = { attendanceinout : router}