const express = require('express');
const router = express.Router();

var config = require('../../database/dbconfig');
var sql = require('mssql');

//Tables
var dboperations = require('../../database/payroll/form_d_attendance_table');
var getMonth = require('../../database/payroll_table');


 

router.get('/form_d',(req, res)=>{
  formDObject = {};
	var user_Id = req.session.userId, user_name = req.session.user_name;
	if(user_Id == null)
  {
	  message = 'Wrong Credentials.';
	  res.render('login.ejs',{message: message});
	  return;
  }
  else{
    dboperations.attendanceReport().then(result=>{
      formDObject.user_Id = user_Id;
      formDObject.user_name = user_name;
      var form_d_data = result[0];
      formDObject.form_d_data = form_d_data;
      getMonth.get_month_data().then(result=>{
        var MonthDetails = result[0];
        console.log(MonthDetails);
        formDObject.MonthDetails = MonthDetails; 
        res.render('pay_roll/form_d_attendance',formDObject);
    }) 
    })
  }
});

router.post('/pay_roll/form_d_attendance_data',(req,res,next)=>{
  var concode = req.body.ccode.split('-');
  var ccode = concode[0];
    var monthYearData = req.body.month.split('-');
    var month = monthYearData[0];
    var year = monthYearData[1];

    //console.log(ccode);
    //console.log(year);
    //console.log(month);


      currentdateArr = [];
    
      //define two date object variables to store the date values  
      var fromdate = year +'-'+ month +'-'+ '01';  
      var enddate  =  year +'-'+ month +'-'+'28';  

      var fdate = new Date(year +'-'+ month +'-'+ '01');  
      var edate = new Date(year +'-'+ month +'-'+'28');  

      //calculate time difference  
      var time_difference = edate.getTime() - fdate.getTime();  

      //calculate days difference by dividing total milliseconds in a day  
      var result = time_difference / (1000 * 60 * 60 * 24);
      console.log(result);

    var pool = sql.connect(config, function (err) {
      if (err) throw err;
        console.log("Connected!");

        var sql = `select distinct WORK_ORDER,CCODE,CNAME from cpcl_work_order_master where CCODE='${ccode}'`;
       
        pool.query(sql, function (err, result) {
          if (err) throw err;
          var data = result.recordsets;
          //console.log(data[0]);
          var wor_order_data = data[0];
          for(i=0;i<wor_order_data.length;i++)  {
            var work_order = wor_order_data[i].WORK_ORDER;
            //console.log(work_order);
            var att = `select format(Shift_date,'yyyy-mm-dd') as shiftdate from Employee_Daily_Attendance where [Shift_date] between 
            '${fromdate}' and '${enddate}' and PO_NUM='${work_order}'`;
            pool.query(att, function (err, result) {
              if (err) throw err;
              //console.log(result);
              var data = result.recordsets;
             // console.log(data[0].length);
              if(data[0].length > 0){

              }
            });
          }
         }); 
    });

	 
});


module.exports = { formDAttendance : router}