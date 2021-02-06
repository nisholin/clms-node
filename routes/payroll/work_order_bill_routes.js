var dboperations = require('../../database/payroll_table');
const express = require('express');
const router = express.Router();

var config = require('../../database/dbconfig');
var sql = require('mssql');


 

router.get('/work_order_billing',(req, res)=>{
	var user_Id = req.session.userId, user_name = req.session.user_name;
	if(user_Id == null)
  {
	  message = 'Wrong Credentials.';
	  res.render('login.ejs',{message: message});
	  return;
  }
  else{
	res.render('pay_roll/work_order_billing',{user_Id:user_Id,user_name:user_name});
  }
	/* res.render('pay_roll/work_order_billing'); */
});

/* 
router.post('/pay_roll/pay_roll_closenew',(req,res,next)=>{
    var contractor = req.body.contractor;
    var sub_contractor = req.body.sub_contractor;
    var employee = req.body.employee;
	var month = req.body.month;
 
	console.log(year);
	console.log(month);
	
    async function getworkOrderBillValues(){
        try{
            let pool = await sql.connect(config);
             await pool.request().query("insert into (year,month) 
              values ('"+contractor+"', '"+sub_contractor+"','"+employee+"','"+month+"')",(req,res)=>{
                 console.log("successfully inserted");
             });
            //return products.recordsets;
        }
        catch(error){
            console.log(error);
        }
    }
    getworkOrderBillValues();
	 res.redirect("/workOrderBill")
});
*/ 


module.exports = { workOrderBill : router}