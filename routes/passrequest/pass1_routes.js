var dboperations = require('../../database/payroll_table');
const express = require('express');
const router = express.Router();

var config = require('../../database/dbconfig');
var sql = require('mssql');


 

router.get('/passrequest_one',(req, res)=>{
	var user_Id = req.session.userId, user_name = req.session.user_name;
	if(user_Id == null)
  {
	  message = 'Wrong Credentials.';
	  res.render('login.ejs',{message: message});
	  return;
  }
  else{
	res.render('pass/pass_request_1',{user_Id:user_Id,user_name:user_name});
  } 
	
});

router.get('contrat/empselect',(req,res,next)=>{
var ccode=req.body.contractor_code;
console.log(ccode);
var cname=req.body.contractor_name;
var workorder_no=req.body.workorder_no;

async function getGateValues(){
	try{
		let pool = await sql.connect(config);
		 let pass=await pool.request().query(`select * from cpcl_employee_master where CCODE='${ccode}' and WORK_ORDER_No='${workorder_no}'`,(req,res)=>{
			 console.log(pass);
		 });
		return pass.recordsets;
	}
	catch(error){
		console.log(error);
	}

}

getGateValues().then(result =>{                
	var data1 = result[0];
	console.log(data1);
	res.render('pass/pass_request_1',{data1});
	})
});

module.exports = { passrequestone : router}