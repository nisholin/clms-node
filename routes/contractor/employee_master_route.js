const express = require('express');
const router = express.Router();
var dboperations = require('../../database/contractor/employee_master_table');


var config = require('../../database/dbconfig');
var sql = require('mssql');


const getContactor_employee_values = (req,res,next)=>{
    dboperations.get_employee_master().then(result=>{
        var data = result[0]; 
        res.render('contractor_master/employeenew',{data})
    })
}
// Employee View
employee = {};
router.get('/employeenew',(req,res,next)=>{
	 var user_Id = req.session.userId, user_name = req.session.user_name;
	  if(user_Id == null)
    {
		message = 'Wrong Credentials.';
        res.render('login.ejs',{message: message});
		return;
    }
    else{
		dboperations.get_employee_master().then(result=>{
            employee.user_Id = user_Id;
            employee.user_name = user_name;
            var data = result[0]; 
            employee.view = data;
            res.render('contractor_master/employeenew',employee);
    })
    } 
}); 

//Add Employee 
router.post('/employee/add',(req,res,next)=>{
    var data = req.body;
    console.log(data);
    var ccode = req.body.ccode;
    //Image Upload
    /* var form = new formidable.IncomingForm();
    form.parse(req,(err,fileds,files)=>{

        var oldpath  = files.filetoupload.path;
        var newpath = 'C:/clms-node/Uploads/'+ files.filetoupload.name;

        fs.rename(oldpath,newpath,(err)=>{
            if(err) throw err;
            //res.write('file upload and moved');
            res.end();
        })
        //res.write('File Uploaded');
        res.end();
    }) */
    //console.log(form);
    var emp_name = req.body.emp_name;
    var work_order_no = req.body.work_order_no;
    var workorder_date = req.body.workorder_date;
    var card_number = req.body.card_number;
    var old_emp_number = req.body.old_emp_number;
   // var no_of_employees = req.body.no_of_employees;
   // var sub_contractor = req.body.sub_contractor;
   // var sub_con_code = req.body.sub_con_code;
  //  var licence_no = req.body.licence_no;
    var emp_code = req.body.emp_code;
    var wo_val_from = req.body.wo_val_from;
    var wo_val_to = req.body.wo_val_to;
    var ci_name = req.body.ci_name;
    var Father = req.body.Father;
    var Husband = req.body.Husband;
    var designation = req.body.designation;
    var dob = req.body.dob;
    var Engaged_Date = req.body.Engaged_Date;
    var gender = req.body.gender;
    var mstatus = req.body.mstatus;
    var Present_address = req.body.Present_address;
    var permanent_address = req.body.permanent_address;
    var phone_no = req.body.phone_no;
    var email_id = req.body.email_id;
    var emergency = req.body.emergency;
    var Emergency_Mobile_Number = req.body.Emergency_Mobile_Number;
    var nominee_name = req.body.nominee_name;
	var nominee_relation = req.body.nominee_relation;
    var nominee_dob = req.body.nominee_dob;
    var category = req.body.category;
    var wage_per_day = req.body.wage_per_day;
    var Incentive_per_day = req.body.Incentive_per_day;
    var Allowance_per_day = req.body.Allowance_per_day;
    var Any_other_wages = req.body.Any_other_wages;
    var uan = req.body.uan;
    var ESI_no = req.body.ESI_no;
    var Aadhar_card_no = req.body.Aadhar_card_no;
    var Identical_mark1 = req.body.Identical_mark1;
    var Bank_name = req.body.Bank_name;
    var Account_no = req.body.Account_no;
    var ifsc_code = req.body.ifsc_code;
    var Blood_grp = req.body.Blood_grp;
    var Entry_gate = req.body.Entry_gate;
    var Work_spot = req.body.Work_spot;
    var Area_of_work = req.body.Area_of_work;
    var area_of_place = req.body.area_of_place;
    var pass_val_from = req.body.pass_val_from;
    var pass_val_to = req.body.pass_val_to;
    var safety_training_from = req.body.safety_training_from;
    var safety_training_to = req.body.safety_training_to;
    var payroll = req.body.payroll;
    var esi_eligible = req.body.esi_eligible;
    var pf_eligible = req.body.pf_eligible;
    var status = req.body.status;
    //console.log(ccode);
    async function geteEmployeeValues(){
        try{
            let pool = await sql.connect(config);
             await pool.request().query("insert into cpcl_employee_master (CCODE,ENAME,WORK_ORDER_No,WORK_OR_DATE,card_number,old_emp_number,ECODE,WO_FROM,WO_TO,CI_NAME,FATHER,DESIGNATION,DOB,ENGAGED_DATE,GENDER,MARITAL_STATUS,PRE_ADDRESS,PERMANENT_ADDRESS,PHONE_NO,EMAIL_ID,EMERGENCY_PERSON,MOBILE_NO,NOMINEE_NAME,NOMINEE_RELATION,NOMINEE_DOB,CAT,WAGE,INCENTIVE,ALLOWANCE,OTHERS,UAN,ESI,AADHAR,IDENTY_MARK,BANK_NAME,ACCOUNT_NO,ifsc_code,BLOOD_GROUP,ENTRY_GATE,WROK_SPOT,AREA_OF_WORK,area_of_place,PASS_VALID_FROM,PASS_VALID_TO,SAFETY_TRAINING_FROM,SAFETY_TRAINING_TO,payroll,esi_eligible,pf_eligible,STATUS) values ('"+ccode+"','"+emp_name+"','"+work_order_no+"','"+workorder_date+"','"+card_number+"','"+old_emp_number+"','"+emp_code+"','"+wo_val_from+"','"+wo_val_to+"','"+ci_name+"','"+Father+"','"+designation+"','"+dob+"','"+Engaged_Date+"','"+gender+"','"+mstatus+"','"+Present_address+"','"+permanent_address+"','"+phone_no+"','"+email_id+"','"+emergency+"','"+Emergency_Mobile_Number+"','"+nominee_name+"','"+nominee_relation+"','"+nominee_dob+"','"+category+"','"+wage_per_day+"','"+Incentive_per_day+"','"+Allowance_per_day+"','"+Any_other_wages+"','"+uan+"','"+ESI_no+"','"+Aadhar_card_no+"','"+Identical_mark1+"','"+Bank_name+"','"+Account_no+"','"+ifsc_code+"','"+Blood_grp+"','"+Entry_gate+"','"+Work_spot+"','"+Area_of_work+"','"+area_of_place+"','"+pass_val_from+"','"+pass_val_to+"','"+safety_training_from+"','"+safety_training_to+"','"+payroll+"','"+esi_eligible+"','"+pf_eligible+"','"+status+"')",(req,res)=>{
                 console.log("Employee successfully inserted");
             });
            //return products.recordsets;
        }
        catch(error){
            console.log(error);
        }
    }
    geteEmployeeValues();
    res.redirect("/employeenew");	 
});

//Employee Edit View
router.get('/employee_edit/:empid',(req, res) => {
    var user_Id = req.session.userId, user_name = req.session.user_name;
    var emp_id = req.params.empid;
    console.log(emp_id);
   /*  async function employeeupdate(){
        try{
                let pool = await sql.connect(config);
                let products = await pool.request().query(`select * from cpcl_employee_master where id = ${emp_id}`); 
                return products.recordsets;
            }
        catch(error){
            console.log(error);
        }
    }   

    employeeupdate().then(result=>{
        var Emp_edit_data = result[0];
        res.render('contractor_master/employee_edit',{user_Id:user_Id,user_name:user_name,Emp_edit_data:Emp_edit_data});
    }) */
});



//Employee update process
router.post('/employee/update',(req, res) => {
    var data = req.body;
    console.table(data);
    

    async function employeeupdate(){
        try{
            let pool = await sql.connect(config);
            await pool.request().query(`update cpcl_employee_master SET 
            CCODE='${req.body.ccode}',
            WORK_ORDER_No='${req.body.work_order_no}',
            WORK_OR_DATE='${req.body.workorder_date}',
            ECODE='${req.body.emp_code}',
            ENAME='${req.body.emp_name}',
            WO_FROM='${req.body.wo_val_from}',
            WO_TO='${req.body.wo_val_to}',
            CI_NAME='${req.body.ci_name}',
            FATHER='${req.body.Father}',
            HUSBAND='${req.body.Husband}',
            DESIGNATION='${req.body.designation}',
            DOB='${req.body.dob}',
            ENGAGED_DATE='${req.body.Engaged_Date}',
            GENDER ='${req.body.gender}',
            MARITAL_STATUS='${req.body.mstatus}',
            PRE_ADDRESS='${req.body.Present_address}',
            PERMANENT_ADDRESS='${req.body.permanent_address}',
            PHONE_NO='${req.body.phone_no}',
            EMAIL_ID='${req.body.email_id}',
            EMERGENCY_PERSON='${req.body.emergency}',
            AREA_OF_WORK='${req.body.Area_of_work}',
            MOBILE_NO='${req.body.Emergency_Mobile_Number}',
            NOMINEE_NAME='${req.body.nominee_name}',
            NOMINEE_RELATION='${req.body.nominee_relation}',
            NOMINEE_DOB='${req.body.nominee_dob}',
            CAT='${req.body.category}',
            WAGE='${req.body.wage_per_day}',
            INCENTIVE='${req.body.Incentive_per_day}',
            ALLOWANCE='${req.body.Allowance_per_day}',
            OTHERS='${req.body.Any_other_wages}',
            UAN='${req.body.uan}',
            ESI='${req.body.ESI_no}',
            AADHAR='${req.body.Aadhar_card_no}', 
            IDENTY_MARK='${req.body.Identical_mark1}', 
            BANK_NAME='${req.body.Bank_name}',
            ACCOUNT_NO='${req.body.Account_no}',
            BLOOD_GROUP='${req.body.Blood_grp}', 
            ENTRY_GATE='${req.body.Entry_gate}', 
            WROK_SPOT='${req.body.Work_spot}', 
            PASS_VALID_FROM='${req.body.pass_val_from}', 
            PASS_VALID_TO='${req.body.pass_val_to}',
            SAFETY_TRAINING_FROM='${req.body.safety_training_from}', 
            SAFETY_TRAINING_TO='${req.body.safety_training_to}',
            STATUS='${req.body.status}'  
            where id ='${req.body.id}'`); 
            //return products.recordsets;
        }
        catch(error){
            console.log(error);
        }
        console.log("Employee Updated Successfully");
    } 

    employeeupdate();

     res.redirect('/employeenew'); 
});


// Get Contractor Work Order Number and Contractor Code
router.post('/get/contractor',(req,res)=>{
    var ccode = req.body.ccode;
    //console.log(ccode);

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

    async function getprefixcode() {
        try{
            let pool = await sql.connect(config);
            let prefix = await pool.request().query( `select * from cpcl_contractor_master where contractor_code ='${req.body.ccode}'`);
            return prefix.recordsets;
        }
        catch(error) {
            console.log(error)
        }
    }

    //prefixcode=[];
    getcontractor().then(result=>{
        var contractor = result[0];
            res.send(contractor);
       // })
        
    })
})

//Get Work Order Date and Total Count
router.post('/get/contractor/work_order_date',(req,res)=>{
    var work_order_number = req.body.wonumber;
    console.log(work_order_number);

    async function getWoDate() {
        try {
            let pool = await sql.connect(config);
            let wo_date = await pool.request().query(`select WORK_OR_DATE,WORKMEN_TOT from cpcl_work_order_master where WORK_ORDER = '${req.body.wonumber}'`);
            return wo_date.recordsets;
        } catch(error) {
            console.log(err);
        }
    }

    async function getACount() {
        try {
            let pool = await sql.connect(config);
            let avilablecount = await pool.request().query(`select count(*) as availableCount from cpcl_employee_master
            where WORK_ORDER_No = '${req.body.wonumber}'`);
            return avilablecount.recordsets;
        } catch(error) {
            console.log(err);
        }
    }

    
    wormanDeatils = [];
    getWoDate().then(result=>{
        var WoDate = result[0];
       // wormanDeatils.push(WoDate);
        //console.log(WoDate)
        getACount().then(result=>{
            var availableCount = result[0];
            //console.log(WoDate)
            wormanDeatils = WoDate.concat(availableCount);
            console.log(wormanDeatils)
            res.send(wormanDeatils);
        })
        //res.send(WoDate);
    })
})

//Get Employee New Form
condetails = {};
router.get('/employee/add',(req,res)=>{
    var user_Id = req.session.userId, user_name = req.session.user_name;
    if(user_Id == null)
  {
      message = 'Wrong Credentials.';
      res.render('login.ejs',{message: message});
      return;
  }
  else{
      dboperations.get_contractor_code().then(result=>{
        condetails.user_Id = user_Id;
        condetails.user_name = user_name;
        var conDetailsCode = result[0]; 
          condetails.conDetailsCode = conDetailsCode;
          res.render('contractor_master/employee_add',condetails);
  })
  } 




   /*  dboperations.get_contractor_code().then(result=>{
        var conDetails = result[0]; 
        console.log(conDetails);
        res.render('contractor_master/employee_add',conDetails);
    })  */
    
})








module.exports = { employee:router }