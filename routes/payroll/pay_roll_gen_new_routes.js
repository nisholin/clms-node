var config = require('../../database/dbconfig');
var sql = require('mssql');

var dboperations = require('../../database/payroll_table');
const express = require('express');
const router = express.Router();



// month fetching for payroll generate 
payrollmonth = {};
router.get('/pay_roll_generationnew',(req,res)=>{
var user_Id = req.session.userId, user_name = req.session.user_name;
if(user_Id == null)
  {
	  message = 'Wrong Credentials.';
	  res.render('login.ejs',{message: message});
	  return;
  }
  else{
    dboperations.get_payroll_month().then(result=>{
        var MonthlList = result[0];
        console.log(MonthlList);        
        payrollmonth.MonthlList = MonthlList;
        payrollmonth.user_Id = user_Id;
        payrollmonth.user_name = user_name;
        res.render('pay_roll/pay_roll_generationnew.ejs',payrollmonth);

    })
  }
});

// month fetching data for payroll close 
payrollclosemonth = {};
router.get('/pay_roll_close',(req,res)=>{
var user_Id = req.session.userId, user_name = req.session.user_name;
if(user_Id == null)
  {
	  message = 'Wrong Credentials.';
	  res.render('login.ejs',{message: message});
	  return;
  }
  else{
    dboperations.get_payroll_close().then(result=>{
        var Month = result[0];
        //console.log(MonthDetails);
        payrollclosemonth.Month = Month;
        payrollclosemonth.user_Id = user_Id;
        payrollclosemonth.user_name = user_name;
      res.render('pay_roll/pay_roll_close',payrollclosemonth);
    })
  }
});

//payroll generate process
router.post('/payroll/generate',(req, res) => {
    async function payroll_generate(){
        try{
            let pool = await sql.connect(config);
            await pool.request().query(`update payroll_master SET flag ='2' where id='${req.body.id}'`);
        }
        catch(error){
            console.log(error);
        }
        console.log("Payroll Generated Successfully");
    } 
    payroll_generate();
     res.redirect('/pay_roll_generationnew'); 
});

//payroll close process
router.post('/payroll/close',(req, res) => {
    async function payroll_close(){
        try{
            let pool = await sql.connect(config);
            await pool.request().query(`update payroll_master SET flag ='3' where id='${req.body.id}'`);
        }
        catch(error){
            console.log(error);
        }
        console.log("Payroll close Successfully");
    } 
    payroll_close();
     res.redirect('/pay_roll_close'); 
});
module.exports = { payrollnew:router}