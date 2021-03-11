var dboperations = require('../../database/payroll_table');
const express = require('express');
const router = express.Router();

var config = require('../../database/dbconfig');
var sql = require('mssql');

//contractor list and month fetching data 
condetails = {};
router.get('/form_b_wage_register',(req,res)=>{
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
      res.render('pay_roll/form_b_wage_reg',condetails);
    }) 
  })
  }
});

//form b wage register fetch data
router.post('/pay_roll/form_b_wage_reg_data',(req,res)=>{
  var ccode = req.body.ccode; 
  var samp_data =[];

  var pool = sql.connect(config, function (err) {
    if (err) throw err;
      console.log("Connected!");
      var sql = `select * from cpcl_work_order_master where CCODE='${ccode}'`;
       
      pool.query(sql, function (err,result) {
        if (err) throw err;
        var data = result.recordsets;
        var wo_details = data[0];
        //console.log(wo_details);
        //console.log(wo_details.length);
        for(i=0;i<wo_details.length;i++){
          var WORKORDERNO = wo_details[i].WORK_ORDER;
          //console.log(WORKORDERNO);
          var month = req.body.month;
          var payroll = month.split("-"); 
          var payroll_month = payroll[0];
          var payroll_year = payroll[1];
          var from_date = payroll_year+'-'+payroll_month+'-'+1;
          var end_date  = payroll_year+'-'+payroll_month+'-'+28;

          var idcrd = `select distinct IDCARDNO from Employee_Daily_Attendance 
          where PO_NUM='${WORKORDERNO}' and Shift_date between '${from_date}' and '${end_date}'`;

          pool.query(idcrd, function (err,idcard) {
            if (err) throw err;
            var id_card = idcard.recordsets;
            var idcrddetails = id_card[0];
             for (j = 0; j < idcrddetails.length; j++) {
             //console.log(idcrddetails);
             var IDCARDNO = idcrddetails[j].IDCARDNO;
              var payroll_query = `SELECT distinct p.con_name,p.emp_new_code,p.emp_old_code,p.emp_name,p.payroll_month,p.no_of_days,p.pd_wages,(p.no_of_days*p.pd_wages) 
              as basic,(p.no_of_days*p.pd_allow) as  pd_allow,p.pd_incen,gross_salary,p.pf_amount ,p.esi_amount,(p.pf_amount+p.esi_amount)
              as total_deduction ,p.lwf,p.net_pay FROM payroll_employee_salary_master p
              where p.payroll_month='${payroll_month}' and p.payroll_year='${payroll_year}' and p.emp_new_code ='${IDCARDNO}'`;
              pool.query(payroll_query, function (err,payroll) {
                if (err) throw err;
                var payrollDetails = payroll.recordsets;
                var payrolldetails = payrollDetails[0];
               //samp_data.push(payrollDetails[0]);
               samp_data =+ payrolldetails;  
                
              })
            }
            //console.log(samp_data);
          })
        }
      })
  })
  res.send(samp_data);
  //res.send("hello")
});




module.exports = {
    formbwage : router
}