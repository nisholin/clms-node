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
  //res.render('pay_roll/form_b_wage_reg',{user_Id:user_Id,user_name:user_name})
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




/*router.post('formbwage/formbwage',(req,res,next)=>{
    var Contractor = req.body.Contractor;
    var month = req.body.month;
    async function getformbwageReportvalues(){
        try{
            let pool = await sql.connect(config);
             await pool.request().query("insert into cpcl_engineer_master (Contractor,month) values ('"+Contractor+"','"+month+"')",(req,res)=>{
                 console.log("successfully inserted");
             });
            //return products.recordsets;
        }
        catch(error){
            console.log(error);
        }
    }
  getformbwageReportvalues();
	res.redirect("pay_roll/form_b_wage_reg");
	 
});
*/

module.exports = {
    formbwage : router
}