const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const path = require('path');
let port = 1000;
const app = express();
var bodyParser = require('body-parser');




//Import Routes
//MASTERS
const homeRoutes = require('./routes/home-routes');
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




// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())
app.use(expressLayouts);
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));

//Session

var session = require('express-session');
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 60000 }
}))


//Use Routes
//MASTERS
app.use(homeRoutes.routes);
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

app.get('/', (req,res)=>{

	message = '';
	res.render('login',{message: message});
})

app.get('/login', (req,res)=>{
	res.render('login');
})

const user = require('./routes/login_check');
app.post('/login_check', user.login);//call for login post

app.get('/home',(req,res)=>{
	res.render('layout');
});



app.listen(port, () => console.log("app is listen-"+port));