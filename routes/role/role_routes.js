var dboperations = require('../../database/role_table');
const express = require('express');
const router = express.Router();

var config = require('../../database/dbconfig');
var sql = require('mssql');


 
//Role table view query

router.get('/role_new',(req, res)=>{
	 var user_Id = req.session.userId, user_name = req.session.user_name;
	  if(user_Id == null)
    {
		message = 'Wrong Credentials.';
        res.render('login.ejs',{message: message});
		return;
    }
    else
	{
		dboperations.getRolevalues().then(result =>{                
		var data = result[0];
		res.render('role/role_new',{user_Id:user_Id,user_name:user_name,data:data});
		})
    } 
    
});




router.get('/role_new_form', (req, res) => {
	var emp = {};
	var user_Id = req.session.userId, user_name = req.session.user_name;
	var contractor_code = req.session.cont_code;
	emp.user_Id = user_Id;
	emp.user_name = user_name;
	emp.contractor_code = contractor_code;
	if (user_Id == null) {
		message = 'Wrong Credentials.';
		res.render('login.ejs', { message: message });
		return;
	}
	else {
		async function get_contractor() {
			try {
				let pool = await sql.connect(config);
				let contractor = await pool.request().query("select * from cpcl_contractor_master where contractor_code ='" + req.session.cont_code + "'");
				return contractor.recordsets;
			}
			catch (error) {
				console.log(error);
			}
		}
		async function get_employee() {
			try {
				let pool = await sql.connect(config);
				let employee = await pool.request().query("select * from cpcl_employee_master where CCODE ='" + req.session.cont_code + "'");
				return employee.recordsets;
			}
			catch (error) {
				console.log(error);
			}
		}
		get_contractor().then(result => {

			var contractor_details = result[0];

			get_employee().then(result => {
				var employee_details = result[0];
				emp.contractor_details = contractor_details;
				emp.employee_details = employee_details;
				res.render('pass/pass_req_1/pass_req_1_new',emp);
			});

		});
	}

});


module.exports={

	role:router

}