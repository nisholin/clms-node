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
async function get_contractor_code(){
    try{
    let pool = await sql.connect(config);
    let product = await pool.request().query("select * from cpcl_contractor_master");
    return product.recordsets;
    }
    catch(error){
    console.log(error);
    }
}



module.exports ={ 
    get_employee_master,
    get_contractor_code
 }