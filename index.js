const express = require('express');

const path = require('path');
let port = 1000;
const app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//const expressLayouts = require('express-ejs-layouts');
// parse application/x-www-form-urlencoded
// parse application/json
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
  Cookie:{maxAge:6000}
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
const workorderRoutes = require('./routes/contractor/work_order_master_route');
const employeeRoutes = require('./routes/contractor/employee_master_route');
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
//PASS REQUEST
const passrequestoneRoutes = require('./routes/passrequest/pass1_routes');
const passrequesttwoRoutes = require('./routes/passrequest/pass2_routes');
const passrequestthreeRoutes = require('./routes/passrequest/pass3_routes');
const printpassRoutes = require('./routes/passrequest/print_pass_routes');
//REPORTS
//const contmasterreportroutes = require('./routes/reports/contractor_master_reports_routes');
//const empreportsroutes = require('./routes/reports/employee_reports_routes');
//const inoutroutes = require('./routes/reports/in_out_report_routes');
//const workorderreportsroutes = require('./routes/reports/work_order_reports_routes');
//const eicreportsroutes = require('./routes/reports/eic_reports_routes');

//Use Routes
//app.use(homeRoutes.routes);
//MASTERS
app.use(engRoutes.engineer);
app.use(shiftRoutes.routes);
app.use(gateRoutes.routes);
//CONTRACTOR MASTERS
app.use(contracorRoutes.routes);
app.use(workorderRoutes.routes);
app.use(employeeRoutes.routes);
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
//PASS REQUEST
app.use(passrequestoneRoutes.passrequestone);
app.use(passrequesttwoRoutes.passrequesttwo);
app.use(passrequestthreeRoutes.passrequestthree);
app.use(printpassRoutes.printpass);
//REPORTS
//app.use(contmasterreportroutes.contMasterReports);
//app.use(empreportsroutes.empReports);
//app.use(inoutroutes.inOutReports);
//app.use(workorderreportsroutes.workOrderReports);
//app.use(eicreportsroutes.eicReports);


app.get('/logout',(req,res)=>{ 
  req.session.destroy(function(err) {

     var message = 'logged out';
    res.render('login',{message:message});

  });
});



app.listen(port, () => console.log("app is listen-"+port));