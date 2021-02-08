var config = require('./dbconfig');

var sql = require('mssql');


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

//let data = {name: req.body.name, status: req.body.status};
/* let sql = "update cpcl_gate_master SET name='"+req.body.name+"', status='"+req.body.status+"' where id ="+Id; */

module.exports = {  getpayrollValues }