var dboperations = require('../../database/payroll_table');
const express = require('express');
const router = express.Router();

var config = require('../../database/dbconfig');
var sql = require('mssql');


 

router.get('/passrequest_two',(req, res)=>{
	var user_Id = req.session.userId, user_name = req.session.user_name;
	if(user_Id == null)
  {
	  message = 'Wrong Credentials.';
	  res.render('login.ejs',{message: message});
	  return;
  }
  else{
	res.render('pass/pass_request_2',{user_Id:user_Id,user_name:user_name});
	}
});


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