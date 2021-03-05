var dboperations = require('../../database/payroll_table');
const express = require('express');
const router = express.Router();

var config = require('../../database/dbconfig');
var sql = require('mssql');


 
//Work Order Billing View
wobilling = {};
router.get('/work_order_billing',(req, res)=>{
	var user_Id = req.session.userId, user_name = req.session.user_name;
	if(user_Id == null)
  {
	  message = 'Wrong Credentials.';
	  res.render('login.ejs',{message: message});
	  return;
  }
  else{
    dboperations.payroll_contract_data().then(result=>{
        wobilling.user_Id = user_Id;
        wobilling.user_name = user_name;
      var conDetailsCode = result[0]; 
      wobilling.conDetailsCode = conDetailsCode;
      dboperations.get_month_data().then(result=>{
          var MonthDetails = result[0];
          //console.log(MonthDetails);
          wobilling.MonthDetails = MonthDetails; 
        res.render('pay_roll/work_order_billing',wobilling);
      }) 
    })
	//res.render('pay_roll/work_order_billing',{user_Id:user_Id,user_name:user_name});
  }
});


router.post('/wo_billing/report',(req,res)=>{
    var data = req.body;
    //console.log(data);
    var month = req.body.month;
    var payroll = month.split("-"); 
    var payroll_month = payroll[0];
    var payroll_year = payroll[1];
    console.log(payroll_month);
    console.log(payroll_year);
    console.log(req.body.ccode);

    async function get_wo_data() {
        try{
            let pool = await sql.connect(config);
            let wo_data = await pool.request().query( `SELECT *
            FROM payroll_employee_salary_master where payroll_month='${payroll_month}' and payroll_year='${payroll_year}' 
            and con_code='${req.body.ccode}'`);
            return wo_data.recordsets;
        }
        catch(error) {
            console.log(error)
        }
      }

      get_wo_data().then(results=>{
        var woBillData = results[0];
        console.log(woBillData);
        res.send(woBillData);
    });
});
   







module.exports = { workOrderBill : router}