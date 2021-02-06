var dboperations = require('../../database/payroll_table');
const express = require('express');
const router = express.Router();

var config = require('../../database/dbconfig');
var sql = require('mssql');


 

router.get('/pay_roll_close',(req, res)=>{
	var user_Id = req.session.userId, user_name = req.session.user_name;
	if(user_Id == null)
  {
	  message = 'Wrong Credentials.';
	  res.render('login.ejs',{message: message});
	  return;
  }
  else{
	res.render('pay_roll/pay_roll_close',{user_Id:user_Id,user_name:user_name});
  }
});

/* 
router.post('/pay_roll/pay_roll_closenew',(req,res,next)=>{
    var year = req.body.year;
    var month = req.body.month;
  
 
	console.log(year);
	console.log(month);
	
    async function getpayRollCloseValues(){
        try{
            let pool = await sql.connect(config);
             await pool.request().query("insert into (year,month) 
              values ('"+year+"', +month+"')",(req,res)=>{
                 console.log("successfully inserted");
             });
            //return products.recordsets;
        }
        catch(error){
            console.log(error);
        }
    }
    getpayRollCloseValues();
	 res.redirect("/payRollClose")
});
*/ 


module.exports = { payRollClose : router}