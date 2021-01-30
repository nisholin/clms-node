var config = require('../dbconfig');
var sql = require ('mssql');

async function get_employee_master(){
    try{
    let pool = await sql.connect(config);
    let product = await pool.request().query("SELECT * FROM [CLMS_V].[dbo].[cpcl_employee_master]");
    return product.recordsets;
    }
    catch(error){
    console.log(error);
    }
}

/* let data = {ccode: req.body.ccode, cname: req.body.cname, workorder: req.body.workorder, workorder_date: req.body.workorder_date, no_of_employees: req.body.no_of_employees, sub_contractor: req.body.sub_contractor, sub_con_code: req.body.sub_con_code, licence_no: req.body.licence_no, emp_code: req.body.emp_code, wo_val_from: req.body.wo_val_from,wo_val_to: req.body.wo_val_to, ci_name: req.body.ci_name, Father: req.body.Father, designation: req.body.designation, dob: req.body.dob, Engaged_Date: req.body.Engaged_Date, gender: req.body.gender, mstatus: req.body.mstatus, Present_address: req.body.Present_address, permanent_address: req.body.permanent_address, phone_no: req.body.phone_no, email_id: req.body.email_id, status: req.body.status, nominee_name: req.body.nominee_name, category: req.body.category, wage_per_day: req.body.wage_per_day, Incentive_per_day: req.body.Incentive_per_day, Allowance_per_day: req.body.Allowance_per_day, Any_other_wages: req.body.Any_other_wages, UAN: req.body.UAN, ESI_no: req.body.ESI_no, Aadhar_card_no: req.body.Aadhar_card_no, Identical_mark1: req.body.Identical_mark1, Bank_name: req.body.Bank_name, Account_no: req.body.Account_no, Blood_grp: req.body.Blood_grp, Entry_gate: req.body.Entry_gate, Work_spot: req.body.Work_spot, Area_of_work: req.body.Area_of_work, pass_val_from: req.body.pass_val_from, pass_val_to: req.body.pass_val_to, safety_training_from: req.body.safety_training_from, safety_training_to: req.body.safety_training_to}; 




let sql = "update cpcl_employee_master SET ccode='"+req.body.ccode+"',  cname='"+req.body.cname+"',workorder='"+req.body.workorder+"',workorder_date='"+req.body.workorder_date+"',no_of_employees='"+req.body.no_of_employees+"',sub_contractor='"+req.body.sub_contractor+"',sub_con_code='"+req.body.sub_con_code+"',licence_no='"+req.body.licence_no+"',emp_code='"+req.body.emp_code+"',wo_val_from='"+req.body.wo_val_from+"',wo_val_to='"+req.body.wo_val_to+"',ci_name='"+req.body.ci_name+"',Father='"+req.body.Father+"',designation='"+req.body.designation+"',dob='"+req.body.dob+"',Engaged_Date='"+req.body.Engaged_Date+"',gender='"+req.body.gender+"',mstatus='"+req.body.mstatus+"',Present_address='"+req.body.Present_address+"',permanent_address='"+req.body.permanent_address+"',phone_no='"+req.body.phone_no+"',email_id='"+req.body.email_id+"',status='"+req.body.status+"',nominee_name='"+req.body.nominee_name+"',category='"+req.body.category+"',wage_per_day='"+req.body.wage_per_day+"',Incentive_per_day='"+req.body.Incentive_per_day+"',Allowance_per_day='"+req.body.Allowance_per_day+"',Any_other_wages='"+req.body.Any_other_wages+"',UAN='"+req.body.UAN+"',ESI_no='"+req.body.ESI_no+"',Aadhar_card_no='"+req.body.Aadhar_card_no+"',Identical_mark1='"+req.body.Identical_mark1+"',Bank_name='"+req.body.Bank_name+"',Account_no='"+req.body.Account_no+"',Blood_grp='"+req.body.Blood_grp+"',Entry_gate='"+req.body.Entry_gate+"',Work_spot='"+req.body.Work_spot+"',Area_of_work='"+req.body.Area_of_work+"',pass_val_from='"+req.body.pass_val_from+"',pass_val_to='"+req.body.pass_val_to+"',safety_training_from='"+req.body.safety_training_from+"',safety_training_to='"+req.body.safety_training_to+"' where id ="+Id;


//INSERT QUERY

INSERT INTO cpcl_employee_master (ccode,cname,workorder,workorder_date,no_of_employees,sub_contractor,sub_con_code,licence_no,emp_code,wo_val_from,wo_val_to,ci_name,Father,designation,dob,Engaged_Date,gender,mstatus,Present_address,permanent_address,phone_no,email_id,status,nominee_name,category,wage_per_day,Incentive_per_day,Allowance_per_day,Any_other_wages,UAN,ESI_no,Aadhar_card_no,Identical_mark1,Bank_name,Account_no,Blood_grp,Entry_gate,Work_spot,Area_of_work,pass_val_from,pass_val_to,safety_training_from,safety_training_to)                    
values(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)
[ccode,cname,workorder,workorder_date,no_of_employees,sub_contractor,sub_con_code,licence_no,emp_code,wo_val_from,wo_val_to,ci_name,Father,designation,dob,Engaged_Date,gender,mstatus,Present_address,permanent_address,phone_no,email_id,status,nominee_name,category,wage_per_day,Incentive_per_day,Allowance_per_day,Any_other_wages,UAN,ESI_no,Aadhar_card_no,Identical_mark1,Bank_name,Account_no,Blood_grp,Entry_gate,Work_spot,Area_of_work,pass_val_from,pass_val_to,safety_training_from,safety_training_to];

*/




module.exports ={ get_employee_master }