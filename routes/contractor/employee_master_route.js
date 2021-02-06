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
        dboperations.get_contractor_code().then(result=>{
            var ccode = result[0]; 
            employee.contcode = ccode;
            res.render('contractor_master/employeenew',employee)
        }) 
    })
    } 
}); 

router.post('/employee/add',(req,res,next)=>{

    var ccode = req.body.ccode;
    
    //Image Upload
    var form = new formidable.IncomingForm();
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

    })
    var cname = req.body.cname;
    var workorder = req.body.workorder;
    var workorder_date = req.body.workorder_date;
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
    var Blood_grp = req.body.Blood_grp;
    var Entry_gate = req.body.Entry_gate;
    var Work_spot = req.body.Work_spot;
    var Area_of_work = req.body.Area_of_work;
    var pass_val_from = req.body.pass_val_from;
    var pass_val_to = req.body.pass_val_to;
    var safety_training_from = req.body.safety_training_from;
    var safety_training_to = req.body.safety_training_to;
    var status = req.body.status;
    console.log(ccode);
    async function geteEmployeeValues(){
        try{
            let pool = await sql.connect(config);
             await pool.request().query("insert into cpcl_employee_master (CCODE,CNAME,WORK_ORDER_No,WORK_OR_DATE,ECODE,WO_FROM,WO_TO,CI_NAME,FATHER,HUSBAND,DESIGNATION,DOB,ENGAGED_DATE,GENDER,MARITAL_STATUS,PRE_ADDRESS,PERMANENT_ADDRESS,PHONE_NO,EMAIL_ID,EMERGENCY_PERSON,MOBILE_NO,NOMINEE_NAME,NOMINEE_RELATION,NOMINEE_DOB,CAT,WAGE,INCENTIVE,ALLOWANCE,OTHERS,UAN,ESI,AADHAR,IDENTY_MARK,BANK_NAME,ACCOUNT_NO,BLOOD_GROUP,ENTRY_GATE,WROK_SPOT,AREA_OF_WORK,PASS_VALID_FROM,PASS_VALID_TO,SAFETY_TRAINING_FROM,SAFETY_TRAINING_TO,STATUS)values ('"+ccode+"','"+cname+"','"+workorder+"','"+workorder_date+"','"+emp_code+"','"+wo_val_from+"','"+wo_val_to+"','"+ci_name+"','"+Father+"','"+Husband+"','"+designation+"','"+dob+"','"+Engaged_Date+"','"+gender+"','"+mstatus+"','"+Present_address+"','"+permanent_address+"','"+phone_no+"','"+email_id+"','"+emergency+"','"+Emergency_Mobile_Number+"','"+nominee_name+"','"+nominee_relation+"''"+nominee_dob+"','"+permanent_address+"','"+category+"','"+wage_per_day+"','"+Incentive_per_day+"','"+Allowance_per_day+"','"+Any_other_wages+"','"+uan+"','"+ESI_no+"','"+Aadhar_card_no+"','"+Identical_mark1+"','"+Bank_name+"','"+Account_no+"','"+Blood_grp+"','"+Entry_gate+"','"+Work_spot+"','"+Area_of_work+"','"+pass_val_from+"','"+pass_val_to+"','"+safety_training_from+"','"+safety_training_to+"','"+status+"')",(req,res)=>{
                 console.log("successfully inserted");
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

module.exports = { routes:router }