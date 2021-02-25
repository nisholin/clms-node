const express = require('express');

const path = require('path');
let port = 1000;
const app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//var moment = require('moment');
//app.locals.moment = moment; 
//const expressLayouts = require('express-ejs-layouts');
//parse application/x-www-form-urlencoded
//parse application/json
//app.use(expressLayouts);

app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));

//Session
const { Cookie } = require('express-session');
const session = require('express-session');
app.use(session({
  secret:'keyboard cat',
  resave:false,
  saveUninitialized:true,
  Cookie:{maxAge:100000}
}))

app.get('/', (req,res)=>{

  if(req.session.userId){
    res.render('/home');    
  }
  else
  {
    var message = '';
    res.render('login',{message:message});
  }  
})

const user = require('./routes/login_check');
app.post('/login_val',user.login_check);
app.get('/home',user.main_page);



//Import Routes
//const homeRoutes = require('./routes/home-routes');
//MASTERS
const engRoutes = require('./routes/cpcl_masters/eng_routes');
const shiftRoutes = require('./routes/cpcl_masters/shift_routes');
const gateRoutes = require('./routes/cpcl_masters/gate_routes');
//CONTRACTOR MASTERS
const contracorRoutes = require('./routes/contractor/contractor_routes');


const contracorMailRoutes = require('./routes/contractor/contractor_mail_master');


const workorderRoutes = require('./routes/contractor/work_order_master_route');
const employeeRoutes = require('./routes/contractor/employee_master_route');
const transferRoutes = require('./routes/contractor/transfer_route');

//ADMIN
const adminRoutes = require('./routes/admin/register_routes');
//PAYROLL
const payrollgeneration = require('./routes/payroll/pay_roll_gen_routes');
const wageslip = require('./routes/payroll/wage_slip_routes');
const formbwageregister = require('./routes/payroll/form_b_wage_routes');
const workorderbilling = require('./routes/payroll/work_order_bill_routes');
const formdattendance = require('./routes/payroll/form_d_attendance_routes');
const attendancereport = require('./routes/payroll/attendance_report_routes');
const mailreport = require('./routes/payroll/mail_report_routes');
const deductionroutes = require('./routes/payroll/deduction_routes');
const payrollcloseroutes = require('./routes/payroll/payroll_close_routes');
//ATTENDANCE
const attendanceroutes = require('./routes/attendance/attendance_routes');
const attendanceinoutroutes = require('./routes/attendance/attendanceInOut_routes');
const attendanceeditroutes = require('./routes/attendance/attendanceEdit_routes');
const attendanceinoutmailroutes = require('./routes/attendance/attendance_in_out_mail_routes');
//PASS REQUEST
const passrequestoneRoutes = require('./routes/passrequest/pass1_routes');
const passrequesttwoRoutes = require('./routes/passrequest/pass2_routes');
const passrequestthreeRoutes = require('./routes/passrequest/pass3_routes');
const printpassRoutes = require('./routes/passrequest/print_pass_routes');
//REPORTS
const contmasterreportroutes = require('./routes/reports/contractor_master_reports_routes');
const empreportsroutes = require('./routes/reports/employee_reports_routes');
const inoutroutes = require('./routes/reports/in_out_report_routes');
const workorderreportsroutes = require('./routes/reports/work_order_reports_routes');
const eicreportsroutes = require('./routes/reports/eic_reports_routes');

//ROLE

const roleroutes = require('./routes/role/role_routes');

//Use Routes
//app.use(homeRoutes.routes);
//MASTERS
app.use(engRoutes.engineer);
app.use(shiftRoutes.shift);
app.use(gateRoutes.gate);
//CONTRACTOR MASTERS
app.use(contracorRoutes.contractor);
app.use(contracorMailRoutes.contractorMail);
app.use(workorderRoutes.routes);
app.use(employeeRoutes.employee);
app.use(transferRoutes.transfer);
//ADMIN
app.use(adminRoutes.routes);
//PAY ROLL GENERATION
app.use(payrollgeneration.payroll);
app.use(wageslip.wageslip);
app.use(formbwageregister.formbwage);
app.use(workorderbilling.workOrderBill);
app.use(formdattendance.formDAttendance);
app.use(attendancereport.attendanceReport);
app.use(mailreport.mailReport);
app.use(deductionroutes.deduction);
app.use(payrollcloseroutes.payRollClose);
//ATTENDANCE
app.use(attendanceroutes.attendance);
app.use(attendanceinoutroutes.attendanceinout);
app.use(attendanceeditroutes.attendanceedit);
app.use(attendanceinoutmailroutes.attendanceinoutmail);
//PASS REQUEST
app.use(passrequestoneRoutes.passrequestone);
app.use(passrequesttwoRoutes.passrequesttwo);
app.use(passrequestthreeRoutes.passrequestthree);
app.use(printpassRoutes.printpass);
//REPORTS
app.use(contmasterreportroutes.contMasterReports);
app.use(empreportsroutes.empReports);
app.use(inoutroutes.inOutReports);
app.use(workorderreportsroutes.workOrderReports);
app.use(eicreportsroutes.eicReports);

app.use(roleroutes.role);


/*
//For csv Uploads
 const fs = require('fs');
const csv = require('fast-csv');
const multer = require('multer');

global.__basedir = __dirname;
// -> Multer Upload Storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
       cb(null, __basedir + '/uploads/')
    },
    filename: (req, file, cb) => {
       cb(null, file.fieldname + "-" + Date.now() + "-" + file.originalname)
    }
  }); 


 const upload = multer({storage: storage});

// -> Express Upload RestAPIs
app.post('/excel_upload/gate_data', upload.single("csvdata"), (req, res) =>{
    importCsvData2MySQL(__basedir + '/uploads/' + req.file.filename);
    res.json({
          'msg': 'File uploaded/import successfully!', 'file': req.file
        });
  }); 

 function importCsvData2MySQL(filePath){
    let stream = fs.createReadStream(filePath);
    let csvData = [];
    let csvStream = csv
        .parse()
        .on("data", function (data) {
            csvData.push(data);
        })
        .on("end", function () {
            // Remove Header ROW
            csvData.shift();

            console.log(csvData); 


           //Create a connection to the database
  var sql = require("mssql");
  const config = {
  server:'127.0.0.1',
  user:'sqladmin',
  password:'Mykeyin@123',
  port :1433,
  database:'CLMS_V',
  options:{
  encrypt:true,
  trustedConnection:true,
  enableArithPort:true,
  enableArithAbort: true,
  instancename:'BSPLNEWASSETSRV\SQLEXPRESS'          
  }              
  } 


 
  sql.connect(config, function (err) {

    if (err) throw err;
      console.log("Connected!");
      var table_insert_sql = "INSERT INTO cpcl_gate_master  (name, status) VALUES ?";
      var values = [csvData];
          sql.query(table_insert_sql, values, function (err, result) {
            if (err) throw err;
            console.log("Number of records inserted: " + result.affectedRows);   });
    });
 
  
//var insert_query = `INSERT INTO cpcl_gate_master  (name)  VALUES ${csvData.join().split(",").map(i => '(' + i + ')').join()}` ; 
 // var insert_query = `INSERT INTO cpcl_gate_master  (name)  VALUES ${csvData.map(function(subarray) { return subarray; })}` ; 

   /* //var scores = [[2, 7], [13, 47], [55, 77]];
   csvData.map(function(subarray) {//this block will map  [2,7], [13, 47], [55,77] as in their own arrays individually?         
    return console.log(subarray);
    //return subarray.map(function(insert_value) {//this will iterate each index of the above array? })\
    }) */
    
  /* async function getEngvalues(){
  try{
  let pool = await sql.connect(config);
  await pool.request().query(insert_query,function (err, result) {
  if (err) throw err;
  });
  }
  catch(error){
  console.log(error);
  }
  }
  getEngvalues();

        
  fs.unlinkSync(filePath)  

});

  stream.pipe(csvStream);
}

 */

app.get('/logout',(req,res)=>{ 
  req.session.destroy(function(err) {

    var message = 'logged out';
    res.render('login',{message:message});

  });
});

app.listen(port, () => console.log("app is listen-"+port));