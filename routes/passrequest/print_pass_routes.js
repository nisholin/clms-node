var dboperations = require('../../database/payroll_table');
const express = require('express');
const router = express.Router();

var config = require('../../database/dbconfig');
var sql = require('mssql');


 

router.get('/print_pass',(req, res)=>{
	var user_Id = req.session.userId, user_name = req.session.user_name;
	if(user_Id == null)
  {
	  message = 'Wrong Credentials.';
	  res.render('login.ejs',{message: message});
	  return;
  }
  else{
	async function get_pass() {
		try {
			let pool = await sql.connect(config);
			let contractor = await pool.request().query(`select * from pass_request_master where status=0`);
			return contractor.recordsets;
		}
		catch (error) {
			console.log(error);
		}
	}
	get_pass().then(result =>{
		var print_pass_view_deatil = result[0];
	//	res.render('pass/print_pass')
	res.render('pass/print_pass',{user_Id:user_Id,user_name:user_name,detail:print_pass_view_deatil});
	})

	
}
});


router.post('/pass_print_view',(req,res)=>{
	var wo_from_date = req.body.wo_from_date;
	var contractor_code=req.body.contractor;
console.log(wo_from_date);
console.log(contractor_code);
	async function get_contractor() {
		try {
			let pool = await sql.connect(config);
			let contractor = await pool.request().query(`
			select  *,case when e.GENDER=1 then 'MALE' else 'FEMALE' end as gender from pass_request_master p join pass_request_employee_details pq on p.contractor_code=pq.con_code join cpcl_employee_master e 
			on pq.emp_code=e.ECODE where p.status=0 and p.contractor_code='${contractor_code}' and pass_request_from='${wo_from_date}'`);
			return contractor.recordsets;
		}
		catch (error) {
			console.log(error);
		}
	}
	get_contractor().then(result =>{
		var print_pass_view_deatil = result[0];
		//console.log(print_pass_view_deatil);
		res.render('pass/pass_print_view',{print_pass_view_deatil:print_pass_view_deatil})
	})
})



module.exports = { printpass : router}