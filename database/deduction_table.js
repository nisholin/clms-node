var config = require('./dbconfig');

var sql = require('mssql');

async function getDeductionDetails(){
    try{
    let pool = await sql.connect(config);
    let product = await pool.request().query("select top 20 * from payroll_salary_deduction order by id desc");
    return product.recordsets;
    }
    catch(error){
    console.log(error);
    }
}


module.exports ={     getDeductionDetails }
