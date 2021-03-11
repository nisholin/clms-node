const express = require('express');
const router = express.Router();

var config = require('../../database/dbconfig');
var sql = require('mssql');

var dboperations = require('../../database/payroll_table');




router.get('/wage_slip',(req,res)=>{
	var user_Id = req.session.userId, user_name = req.session.user_name;
	if(user_Id == null)
  {
	  message = 'Wrong Credentials.';
	  res.render('login.ejs',{message: message});
	  return;
  }
  else{

    dboperations.payroll_contract_data().then(result=>{
        condetails.user_Id = user_Id;
        condetails.user_name = user_name;
      var conDetailsCode = result[0]; 
      condetails.conDetailsCode = conDetailsCode;
      dboperations.get_month_data().then(result=>{
          var MonthDetails = result[0];
          //console.log(MonthDetails);
          condetails.MonthDetails = MonthDetails; 
        res.render('pay_roll/wage_slip',condetails);
      }) 
    })

  //res.render('pay_roll/wage_slip',{user_Id:user_Id,user_name:user_name})
  }
    /* res.render('pay_roll/wage_slip') */
});



router.post('/pay_roll/wage_slip_view',(req,res,next)=>{
    var contractor = req.body.ccode;
    var month = req.body.month;
    var wage = month.split("-"); 
    var wage_month = wage[0];
    var month_year = wage[1];
    //console.log(contractor);
    //console.log(wage_month);
    //console.log(month_year);
    
    async function getwageslipvalues(){
        try{
            let pool = await sql.connect(config);
            let wagedata =  await pool.request().query(`SELECT con_name,emp_name,no_of_days,pd_wages,(no_of_days*pd_wages) as 
             basic,(no_of_days*pd_allow) as  pd_allow,pd_incen,gross_salary,pf_amount ,
             esi_amount,(pf_amount+esi_amount) as total_deduction ,salary_advance,ptf_amount,
             net_pay FROM payroll_employee_salary_master where payroll_month='${wage_month}' 
             and payroll_year='${month_year}' and 
             con_code='${contractor}'`);
             return wagedata.recordsets;
        }
        catch(error){
            console.log(error);
        }
    }
  getwageslipvalues().then(results =>{
    var wageData = results[0];
    //console.log(wageData);
    res.send(wageData);
  });	 
});



module.exports = {
    wageslip : router
}