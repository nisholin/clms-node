var config = require('../dbconfig');
var sql = require ('mssql');

async function get_employee_master(){
    try{
    let pool = await sql.connect(config);
    let product = await pool.request().query("SELECT * FROM cpcl_employee_master");
    return product.recordsets;
    }
    catch(error){
    console.log(error);
    }
}
async function get_employee_transfer_master(){
    try{
    let pool = await sql.connect(config);
    let product = await pool.request().query("SELECT * FROM cpcl_transfer_detail WHERE STATUS='2'");
    return product.recordsets;
    }
    catch(error){
    console.log(error);
    }
}


async function get_contractor_code(){
    try{
    let pool = await sql.connect(config);
    let product = await pool.request().query("select CCODE ,CONCAT(CCODE,'-',CNAME) as CODE_NAME from [Cpcl_Contract_Master] order by id asc");
    return product.recordsets;
    }
    catch(error){
    console.log(error);
    }
}
async function get_work_order_no(){
    try{
    let pool = await sql.connect(config);
    let product = await pool.request().query("select * from cpcl_work_order_master");
    return product.recordsets;
    }
    catch(error){
    console.log(error);
    }
}



module.exports ={ 
    get_employee_master,
    get_contractor_code,
    get_work_order_no,
    get_employee_transfer_master
 }