var config = require('../database/dbconfig');
var sql = require ('mssql');


async function getpayrollValues(){
    try{
        let pool = await sql.connect(config);
        let payroll = await pool.request().query("select EMPCODE,Employee_Name,COUNT(EMPCODE) as work_Days,PO_NUM,CCODE,CNAME from employee_attendance_jan  where Shift_date>'2020-12-31' group by EMPCODE,Employee_Name,PO_NUM,PO_NUM,CCODE,CNAME");
        return payroll.recordsets;
    }
    catch(error){
        console.log(error);
    }
}
//contractor List fetch query
async function payroll_contract_data (){
    try{
        let pool = await sql.connect(config);
        let payroll = await pool.request().query("select CCODE,CNAME from Cpcl_Contract_Master where CNAME in (select CNAME from cpcl_work_order_master group by CNAME) order by CNAME");
        return payroll.recordsets;
    }
    catch(error){
        console.log(error);
    }
}
//month and year list fetch query
async function get_month_data (){
    try{
        let pool = await sql.connect(config);
        let payroll = await pool.request().query("select datepart(year,Shift_date) as YEAR, datepart(month,Shift_date) as MONTH From  Employee_Daily_Attendance group by datepart(year,Shift_date), datepart(month,Shift_date)");
        return payroll.recordsets;
    }
    catch(error){
        console.log(error);
    }
}

//month and year list fetch query
async function get_payroll_month (){
    try{
        let pool = await sql.connect(config);
        let payroll = await pool.request().query(" select id,month,year,flag  from payroll_master where flag ='1' ");
        return payroll.recordsets;
    }
    catch(error){
        console.log(error);
    }
}

//close payroll month query
async function get_payroll_close (){
    try{
        let pool = await sql.connect(config);
        let payroll = await pool.request().query(" select id,month,year,flag  from payroll_master where flag ='2' ");
        return payroll.recordsets;
    }
    catch(error){
        console.log(error);
    }
}

module.exports = {  
    getpayrollValues,
    payroll_contract_data,
    get_month_data,
    get_payroll_month,
    get_payroll_close
 }