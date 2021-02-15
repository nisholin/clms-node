var dboperations = require('../../database/payroll_table');
const express = require('express');
const router = express.Router();

var config = require('../../database/dbconfig');
var sql = require('mssql');


 

router.get('/passrequest_two',(req, res)=>{
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
            let employee = await pool.request().query("select * from pass_request_master");
            return employee.recordsets;
        }
        catch (error) {
            console.log(error);
        }
    }

    get_employee().then(result => {
        var employee_details = result[0];
        emp.employee_details = employee_details;
        res.render('pass/pass_request_2',emp);
    });

	//res.render('pass/pass_request_2',{user_Id:user_Id,user_name:user_name});
	}
});

//approve view


router.get('/pass_approve_view/:pass_id', (req, res) => {
	var emp = {};
	var user_Id = req.session.userId, user_name = req.session.user_name;
	var contractor_code = req.params.pass_id;
	console.log(contractor_code);
	emp.user_Id = user_Id;
	emp.user_name = user_name;
	emp.contractor_code = contractor_code;
	  if (user_Id == null) {
		message = 'Wrong Credentials.';
		res.render('login.ejs', { message: message });
		return;
	}
	else {
	  
		 async function get_employee() {
			try {
				let pool = await sql.connect(config);
				let employee = await pool.request().query(`select * from pass_request_master where contractor_code='${contractor_code}'`);
				return employee.recordsets;
			}
			catch (error) {
				console.log(error);
			}
		} 

		get_employee().then(result => {
				var employee_details = result[0];
			//	emp.contractor_details = contractor_details;
				//emp.employee_details = employee_details;
				console.log(employee_details);
				res.render('pass/pass_request_approve_view',{user_Id:user_Id,user_name:user_name,employee_details:employee_details});
			});
 
	 	
	 } 
	 
});

//pass upprove

router.get('/pass_approve/approve',(req,res) =>{
	var code=req.body.contractor_code;
	console.log(code);

})

/* 
router.post('/pass/pass_request_2new',(req,res,next)=>{
    var contractor_code = req.body.contractor_code;
    var Contractor_name = req.body.Contractor_name;
    var workorder_no = req.body.workorder_no;
 
    console.log(contractor_code);
	  console.log(Contractor_name);
	  console.log(workorder_no);
	
    async function getpass_request_2Values(){
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
    getpass_request_2Values();
	 res.redirect("/pass_request_2")
});
*/ 



module.exports = { passrequesttwo : router}