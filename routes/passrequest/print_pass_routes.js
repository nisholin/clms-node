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
	res.render('pass/print_pass',{user_Id:user_Id,user_name:user_name});
}
});


router.post('pass_print_view',(req,res)=>{
	var wo_from_date = req.body.wo_from_date;

	async function get_contractor() {
		try {
			let pool = await sql.connect(config);
			let contractor = await pool.request().query(`select * from cpcl_contractor_master where WO_FROM ='${wo_from_date}'`);
			return contractor.recordsets;
		}
		catch (error) {
			console.log(error);
		}
	}
	get_contractor().then(result =>{
		var print_pass_view_deatil = result[0];
		res.render('pass/print_pass')
	})
})



module.exports = { printpass : router}