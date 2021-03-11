var config = require('../dbconfig');
var sql = require ('mssql');


async function attendanceReport() {
    try{
        let pool = await sql.connect(config);
        let attendanceData = await pool.request().query(`select CCODE ,CONCAT(CCODE,'-',CNAME) as 
        CODE_NAME from Cpcl_Contract_Master where CNAME in 
        (select CNAME from cpcl_work_order_master group by CNAME) order by CNAME`);
        return attendanceData.recordsets;
    }catch(err){
        console.log(err)
    }
}


module.exports = { attendanceReport }
