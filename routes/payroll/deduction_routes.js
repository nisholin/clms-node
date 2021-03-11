var dboperations = require('../../database/deduction_table');
const express = require('express');
const router = express.Router();

var config = require('../../database/dbconfig');
var sql = require('mssql');



deduction_data= {};

router.get('/deduction',(req, res)=>{


	var user_Id = req.session.userId, user_name = req.session.user_name;
	if(user_Id == null)
	{
		message = 'Wrong Credentials.';
		res.render('login.ejs',{message: message});
		return;
	}
  	else{

		dboperations.getDeductionDetails().then(result=>{
            deduction_data.user_Id = user_Id;
            deduction_data.user_name = user_name;
            var data = result[0]; 
            deduction_data.deduction_view = data;
			res.render('pay_roll/deduction',deduction_data);
    })

		
  }
});


Empdetails = {};
router.get('/deduction/add',(req,res)=>{
    var user_Id = req.session.userId, user_name = req.session.user_name;
    if(user_Id == null)
  {
      message = 'Wrong Credentials.';
      res.render('login.ejs',{message: message});
      return;
  }
  else{
      dboperations.get_employee_master().then(result=>{
        Empdetails.user_Id = user_Id;
        Empdetails.user_name = user_name;
        var empDetailsCode = result[0]; 
		Empdetails.empDetailsCode = empDetailsCode;
          res.render('pay_roll/deduction_add',Empdetails);
  })
  } 
})


router.post('/deduction/new',(req,res)=>{
	var ecode = req.body.ecode;
	var amount = req.body.amount;

		async function deduction_entry(){
		try{
			let pool = await sql.connect(config);
				await pool.request().query(`INSERT INTO [dbo].[payroll_salary_deduction]
				([payroll_month],[payroll_year]	,[date]	,[id_card_no],[name],[workorder_no]	,[advance_amount],[status],[created_by],[created_on])
		  VALUES (3,2021,GETDATE(),'${ecode}','test',123,'${amount}',1,1,GETDATE())`,(req,res)=>{
					//console.log("Employee successfully inserted");
				});
		}
		catch(error){
			console.log(error);
		}
		}
		deduction_entry();
		res.redirect("/deduction");	 
})



module.exports = { deduction : router}