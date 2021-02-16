var dboperations = require('../../database/payroll_table');
const express = require('express');
const router = express.Router();

var config = require('../../database/dbconfig');
var sql = require('mssql');


 


router.get('/passrequest_three',(req, res)=>{
    var emp = {};
	var user_Id = req.session.userId, user_name = req.session.user_name;
	var contractor_code = req.session.cont_code;
	emp.user_Id = user_Id;
	emp.user_name = user_name;
	if(user_Id == null)
  {
	  message = 'Wrong Credentials.';
	  res.render('login.ejs',{message: message});
	  return;
  }
  else{
    async function get_employee() {
        try {
            let pool = await sql.connect(config);
            let employee = await pool.request().query("select * from pass_request_master where status=1");
            return employee.recordsets;
        }
        catch (error) {
            console.log(error);
        }
    }

    get_employee().then(result => {
        var employee_details = result[0];
        emp.employee_details = employee_details;
        res.render('pass/pass_request_3',emp);
    });

	//res.render('pass/pass_request_2',{user_Id:user_Id,user_name:user_name});
	}
});
 

/*
router.post('/pass/pass_request_3new',(req,res,next)=>{
	var contractor_code = req.body.contractor_code;
    var Contractor_name = req.body.Contractor_name;
    var workorder_no = req.body.workorder_no;

    console.log(contractor_code);
	console.log(Contractor_name);
	console.log(workorder_no);

	async function getpassrequestthreeValues(){
		try{
			let pool = await sql.connect(config);
			 await pool.request().query("insert into (contractor_code,Contractor_name,workorder_no)
			  values ('"+contractor_code+"','"+Contractor_name+"','"+workorder_no+"')",(req,res)=>{
				 console.log("successfully inserted");
			 });
			//return products.recordsets;
		}
		catch(error){
			console.log(error);
		}
	}
	getpassrequestthreeValues();
	 res.redirect("/passrequestthree")
});
*/


module.exports = { passrequestthree : router}