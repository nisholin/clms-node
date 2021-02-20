const express = require('express');
const router = express.Router();
var dboperations = require('../../database/pass/pass_req_table_1');

var config = require('../../database/dbconfig');
var sql = require('mssql');
const { response } = require('express');




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
				let products = await pool.request().query("select * from pass_request_master");
				return products.recordsets;
			}
			catch (error) {
				console.log(error);
			}
		}
		get_contractor().then(result => {
			var contractor_details = result[0];
			res.render('pass/pass_req_1/pass_request_1',{user_Id: user_Id, user_name: user_name,contractor_details: contractor_details });
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
		async function get_contractor_detail() {
			try {
				let pool = await sql.connect(config);
				let contractor = await pool.request().query("select * from cpcl_contractor_master");
				return contractor.recordsets;
			}
			catch (error) {
				console.log(error);
			}
		}
		async function get_workorder_detail() {
			try {
				let pool = await sql.connect(config);
				let employee = await pool.request().query("select * from cpcl_work_order_master");
				return employee.recordsets;
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



		get_contractor_detail().then(result => {

			var contractor_details = result[0];
			
			get_workorder_detail().then(result => {

			var workdetail = result[0];


			get_employee().then(result => {
				var employee_details = result[0];
				emp.contractor_details = contractor_details;
				emp.workdetail=workdetail;
				emp.employee_details = employee_details;
				res.render('pass/pass_req_1/pass_req_1_new',emp);
			});

		});
	});
	}

});

router.get('contrat/empselect', (req, res, next) => {

	var ccode = req.body.contractor_code;
	//console.log(ccode);
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

router.post('/pass_req_new_1/add', function(req, res) {
    var ccode 				= req.body.ccode;
	var workorder_no 		= req.body.workorder_no;
	var pass_from 			= req.body.pass_from;
    var pass_to 			= req.body.pass_to;
	var no_of_pass 			= req.body.no_of_pass;
	var nature_of_jobs 		= req.body.nature_of_jobs;
	var job_completion_date = req.body.job_completion_date;
	var contractor_sap_no 	= req.body.contractor_sap_no;
	var pass_type 			= req.body.pass_type;
	var favorite 			= req.body.favorite[0];

console.log(favorite);
	async function get_employee() {
		try {
			let pool = await sql.connect(config);
			await pool.request().query(`insert into pass_request_master
			 (contractor_code,contractor_name,work_order_no,pass_request_from,pass_request_to,req_pass_count,job_nature,completion_date,
				cont_sap_no,pass_type,status)
			 values ('${ccode}','','${workorder_no}','${pass_from}','${pass_to}','${no_of_pass}','${nature_of_jobs}','${job_completion_date}',
			 '${contractor_sap_no}','${pass_type}',0)`); 

			
		}
		catch (error) {
			console.log(error);
		}
	}
	get_employee();
	console.log("Pass Request Successfully Updated...")
	res.redirect('/passrequest_one/pass_request_one_new');  
});
	//console.log(req.body.ccode);
	//console.log(req.body.searchIDs);

/* }); */

	/*
router.post('/pass_req_new_1/add',(req,res)=>{
	var ccode = req.body.e_id;
    console.log(ccode);

	//var ccode 				= req.body.ccode;
	var cname	 			= req.body.cname;
	var workorder_no 		= req.body.workorder_no;
	var pass_from 			= req.body.pass_from;
    var pass_to 			= req.body.pass_to;
	var no_of_pass 			= req.body.no_of_pass;
	var nature_of_jobs 		= req.body.nature_of_jobs;
	var job_completion_date = req.body.job_completion_date;
	var contractor_sap_no 	= req.body.contractor_sap_no;
	var pass_type 			= req.body.pass_type;
	var check_value=	req.body.check;
	*/
	
	//console.log(check_value);
	 /* async function get_employee() {
		try {
			let pool = await sql.connect(config);
			await pool.request().query(`insert into pass_request_master
			 (contractor_code,contractor_name,work_order_no,pass_request_from,pass_request_to,req_pass_count,job_nature,completion_date,
				cont_sap_no,pass_type,status)
			 values ('${ccode}','${cname}','${workorder_no}','${pass_from}','${pass_to}','${no_of_pass}','${nature_of_jobs}','${job_completion_date}',
			 '${contractor_sap_no}','${pass_type}',0)`); 

			
		}
		catch (error) {
			console.log(error);
		}
	}
	get_employee();
	console.log("Pass Request Successfully Updated...")
	res.redirect('/passrequest_one/pass_request_one_new');  
})
*/
//Onchange Get workorder Details
router.post('/get/workorder',(req,res)=>{
    var ccode = req.body.ccode;
   // console.log(ccode);

    async function getcontractor() {
        try{
            let pool = await sql.connect(config);
            let cont = await pool.request().query( `select * from cpcl_work_order_master where CCODE = '${ccode}'`);
            return cont.recordsets;
        }
        catch(error) {
            console.log(error)
        }
    }

    getcontractor().then(result=>{
        var contractor = result[0];
        res.send(contractor);
    })
})

//Onchange Get employee Details
router.post('/get/employee',(req,res)=>{
    var ccode = req.body.ccode;
    //console.log(ccode);

    async function getwork() {
        try{
            let pool = await sql.connect(config);
            let cont = await pool.request().query( `select * from cpcl_employee_master where WORK_ORDER_No= '${ccode}'`);
            return cont.recordsets;
        }
        catch(error) {
            console.log(error)
        }
    }

    getwork().then(result=>{
        var employee = result[0];
        //res.send(contractor);
		console.log(employee);
		res.send(employee)
		//res.render('pass/pass_req_1/pass_req_1_new',employee);
    }) 
})

router.post('/pass_req_new_1/pass_request_employee_details',(req,res)=>{
	//var data = req.body;
	
	var ccode 				= req.body.ccode;
	var ecode 				= req.body.ecode;
	//console.log(ecode);
	async function get_con() {
		try {
			let pool = await sql.connect(config);
			
			 await pool.request().query(`insert into pass_request_employee_details (con_code,emp_code,status) values ('${ccode}','${ecode}',0)`);
		}
		catch (error) {
			console.log(error);
		}
	}
	get_con();
	console.log("Pass Request Successfully Updated...")
	res.redirect('/passrequest_one/pass_request_one_new');
})


module.exports = { passrequestone: router }