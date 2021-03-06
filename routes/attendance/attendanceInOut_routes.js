var dboperations = require('../../database/attendance/attendance_in_out_table');
var cont = require('../../database/contractor/employee_master_table');
const express = require('express');
const router = express.Router();

var config = require('../../database/dbconfig');
var sql = require('mssql');
const { response } = require('express');


 



router.get('/a_in_out',(req, res)=>{
  condetails = {};
	var user_Id = req.session.userId, user_name = req.session.user_name;
  
	  if(user_Id == null)
    {
		message = 'Wrong Credentials.';
        res.render('login.ejs',{message: message});
		return;
    }
    else{
     /*  dboperations.attendance_in_out_data().then(result =>{                
      var contractor = result[0];
     // console.log(contractor);
      att.contract_attendance= contract_attendance;
      att.contractor = contractor;
      att.user_Id = user_Id;
      att.user_name = user_name;
      res.render('attendance/attendance_in_out',att);
      }) */ 

      cont.get_contractor_code().then(result=>{
        condetails.user_Id = user_Id;
        condetails.user_name = user_name;
        var conDetailsCode = result[0]; 
          condetails.conDetailsCode = conDetailsCode;
          res.render('attendance/attendance_in_out',condetails);
  })
    }
});
  
  
router.post('/contractor_attendance',(req,res,next)=>{
  var data                    = req.body;
  //console.log(data);
  var ccodeName               = req.body.contractor_code.split("-",1);
  var ccode                   = ccodeName[0];
  console.log(ccode);
  var from_date               = req.body.from_date;
  var to_date                 = req.body.to_date;
  async function getwork() {
    try{
        let pool = await sql.connect(config);
        let employee_attendance = await pool.request().query( `select id ,CCODE ,CNAME ,EMPCODE ,IDCARDNO ,Employee_Name ,
        Shift_date ,[Shift] ,[IN] ,Out ,Gate ,PO_NUM ,Status from Employee_Daily_Attendance 
        where CCODE='${ccode}' and Shift_date between '${from_date}' and '${to_date}' 
        order by EMPCODE,Employee_Name,PO_NUM`);
        return employee_attendance.recordsets;
    }
    catch(error) {
        console.log(error)
    }
}
getwork().then(result=>{
    var attendance_details = result[0];
//console.log(employee);
res.send(attendance_details);

}) 
  

});




module.exports = { attendanceinout : router}