var config = require('../dbconfig');

var sql = require ('mssql');

async function attendance_in_out_data(){
    try{
            let pool = await sql.connect(config);
            let cpcl_contractor_master = await pool.request().query("SELECT * FROM [CLMS_V].[dbo].[cpcl_contractor_master]");
            
            return cpcl_contractor_master.recordsets;
    }
    catch(error){
        console.log(error);
    }
}



module.exports = { attendance_in_out_data }