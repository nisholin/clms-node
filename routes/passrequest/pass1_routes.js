const express = require('express');
const router = express.Router();
var dboperations = require('../../database/pass/pass_req_table_1');

var config = require('../../database/dbconfig');
var sql = require('mssql');




router.get('/passrequest_one', (req, res) => {
	var user_Id = req.session.userId, user_name = req.session.user_name;
	if (user_Id == null) {
		message = 'Wrong Credentials.';
		res.render('login.ejs', { message: message });
		return;
	}
	else {
		async function get_contractor() {
			try {
				let pool = await sql.connect(config);
				let products = await pool.request().query("select * from pass_request_master where contractor_code ='" + req.session.cont_code + "'");
				return products.recordsets;
			}
			catch (error) {
				console.log(error);
			}
		}
		get_contractor().then(result => {
			var contractor_details = result[0];
			res.render('pass/pass_req_1/pass_request_1', { user_Id: user_Id, user_name: user_name, contractor_details: contractor_details });
		});
	}
});

router.get('/passrequest_one/pass_request_one_new', (req, res) => {
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
				res.render('pass/pass_req_1/pass_req_1_new', emp);
			});

		});
	}

});

router.get('contrat/empselect', (req, res, next) => {

	var ccode = req.body.contractor_code;
	console.log(ccode);
	var cname = req.body.contractor_name;
	var workorder_no = req.body.workorder_no;

	/* 
	router.post('/pass/pass_request_1new',(req,res,next)=>{
		var contractor_code = req.body.contractor_code;
		var Contractor_name = req.body.Contractor_name;
		var workorder_no = req.body.workorder_no;
	 
		console.log(contractor_code);
		console.log(Contractor_name);
		console.log(workorder_no);
		
		async function getpass_request_1Values(){
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
		getpass_request_1Values();
		 res.redirect("/pass_request_1")
	});
	*/
});

module.exports = { passrequestone: router }