var dboperations = require('../../database/payroll_table');
const express = require('express');
const router = express.Router();

var config = require('../../database/dbconfig');
var sql = require('mssql');


 

router.get('/form_d',(req, res)=>{
	var user_Id = req.session.userId, user_name = req.session.user_name;
	if(user_Id == null)
  {
	  message = 'Wrong Credentials.';
	  res.render('login.ejs',{message: message});
	  return;
  }
  else{
	res.render('pay_roll/form_d_attendance',{user_Id:user_Id,user_name:user_name});
  }
});

/*router.post('formDAttendance/formDAttendance',(req,res,next)=>{
    var Contractor = req.body.Contractor;
    var month = req.body.month;
    async function getformDAttendanceReportvalues(){
        try{
            let pool = await sql.connect(config);
             await pool.request().query("insert into cpcl_engineer_master (Contractor,month) values ('"+Contractor+"','"+month+"')",(req,res)=>{
                 console.log("successfully inserted");
             });
            //return products.recordsets;
        }
        catch(error){
            console.log(error);
        }
    }
  getformDAttendanceReportvalues();
	res.redirect("pay_roll/form_d_attendance");
	 
});
*/

module.exports = { formDAttendance : router}