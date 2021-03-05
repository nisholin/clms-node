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
router.post('/pay_roll/form_b_wage_reg_data',(req,res,next)=>{
 
  var ccode = req.body.ccode; 
  var samp_data =[];
  async function get_wo_data() {
      try{
          let pool = await sql.connect(config);
          let wo_data = await pool.request().query( `select * from cpcl_work_order_master where CCODE='${ccode}'`);
            return wo_data.recordsets;
      }
      catch(error) {
          console.log(error)
      }
    }
    //getting work_order_no function
    get_wo_data().then(result=>{
      var wo_details = result[0];
      //samp_data.push(...wo_details);
      //console.log(wo_details);
          for(i=0; i<wo_details.length; i++){
            async function check_wo_data() {
              try{
                var WORKORDERNO = wo_details[i].WORK_ORDER;
                var month = req.body.month;
                  var payroll = month.split("-"); 
                  var payroll_month = payroll[0];
                  var payroll_year = payroll[1];
                  var from_date = payroll_year+'-'+payroll_month+'-'+1;
                  var end_date  = payroll_year+'-'+payroll_month+'-'+31;
                  let pool = await sql.connect(config);
                  let check_wo_data= await pool.request().query(`select distinct IDCARDNO from Employee_Daily_Attendance where PO_NUM='${WORKORDERNO}' and Shift_date between '${from_date}' and '${end_date}' `);
                  return check_wo_data.recordsets;
              }
              catch(error) {
                  console.log(error)
              }
            }
            //getting IDCARDNO function
            check_wo_data().then(results=>{
              var check_wo_details = results[0];
            //console.log(check_wo_details);
              for(j=0; j<check_wo_details.length; j++){
                    async function payroll_data() {
                      try{
                        var IDCARDNO = check_wo_details[j].IDCARDNO;
                        //console.log(IDCARDNO)
                        var MONTH = req.body.month;
                        var PAYROLL = MONTH.split("-"); 
                        var PAYROLL_MONTH =  PAYROLL[0];
                        var PAYROLL_YEAR  =  PAYROLL[1];
                          let pool = await sql.connect(config);
                          let payroll_query =await pool.request().query( `SELECT distinct p.con_name,p.emp_new_code,p.emp_old_code,p.emp_name,p.payroll_month,p.no_of_days,p.pd_wages,(p.no_of_days*p.pd_wages) 
                                as basic,(p.no_of_days*p.pd_allow) as  pd_allow,p.pd_incen,gross_salary,p.pf_amount ,p.esi_amount,(p.pf_amount+p.esi_amount)
                                as total_deduction ,p.lwf,p.net_pay FROM payroll_employee_salary_master p
                                where p.payroll_month='${PAYROLL_MONTH}' and p.payroll_year='${PAYROLL_YEAR}' and p.emp_new_code ='${IDCARDNO}'`);
                                return payroll_query.recordsets;
                      }
                      catch(error) {
                          console.log(error)
                      }
                    }
                    payroll_data().then(result=>{
                      var newItems = result[0];
                      samp_data.push(newItems);
                      console.log(samp_data);
                      res.send(newItems);
                    }); 
              } 
          });
        } 
       
    });
});




module.exports = {
    formbwage : router
}