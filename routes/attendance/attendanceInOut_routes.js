var dboperations = require('../../database/attendance/attendance_in_out_table');
const express = require('express');
const router = express.Router();

var config = require('../../database/dbconfig');
var sql = require('mssql');
const { response } = require('express');


 



router.get('/a_in_out',(req, res)=>{
  var att = {};
	var user_Id = req.session.userId, user_name = req.session.user_name;
  var  contract_attendance = "";
  
	  if(user_Id == null)
    {
		message = 'Wrong Credentials.';
        res.render('login.ejs',{message: message});
		return;
    }
    else{
      dboperations.attendance_in_out_data().then(result =>{                
      var contractor = result[0];
     // console.log(contractor);
      att.contract_attendance= contract_attendance;
      att.contractor = contractor;
      att.user_Id = user_Id;
      att.user_name = user_name;
      res.render('attendance/attendance_in_out',att);
      }) 
    }
  });
  
  
router.get('/a_in_out_view',(req,res,next)=>{
  var data = req.body;
  console.log(data);
  var contract_code_data = req.body.contract_code_data; 
  var from_date = req.body.from_date;
  var to_date = req.body.to_date;
 
  //console.log(ccode);



  /* async function geteContractValues(){
      try{
          let pool = await sql.connect(config);
          let products= await pool.request().query(`select * from employee_attendance_jan 
           where CCODE='${contract_code_data}' and Shift_date between '${from_date}' and '${to_date}' 
           order by EMPCODE,Employee_Name,PO_NUM`,(req,res)=>{
              
           });
          return products.recordsets;
      }
      catch(error){
          console.log(error);
      }
  } */
  sql.connect(config, function (err) {
    if (err) console.log(err);
    // create Request object
    var request = new sql.Request();

    // query to the database and get the records
    request.query(`select * from employee_attendance_jan 
    where CCODE='${contract_code_data}' and Shift_date between '${from_date}' and '${to_date}' 
    order by EMPCODE,Employee_Name,PO_NUM`, function (err, recordset) {
          
      if (err) console.log(err)
      //var data = recordset;
      // send records as a response
      res.send('attendance/attendance_in_out',recordset);
  });
  })

  /* var data= geteContractValues().then(result =>{
    var contract_attendance = result[0];
    res.send(contract_attendance)
  }); */

});




module.exports = { attendanceinout : router}