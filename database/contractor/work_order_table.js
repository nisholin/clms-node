 var config = require('../dbconfig');

var sql = require ('mssql');

async function get_workOrder(){
    try{
            let pool = await sql.connect(config);
            let product = await pool.request().query("SELECT [id],[CCODE],[CNAME],[VENDOR_NO],[WORK_ORDER],[WORK_OR_DATE],[CVALUE],[DURATION],[CDURATION],[EIC_PRNO],[EIC],[JOB_DESC],[DEPARTMENT],[EMPLOYEE_COUNT],[CLRA],[ISMW],[WORKMEN_TOT],[EXCESS_CLRA_COUNT],[EXCESS_CLRA_CONT_COUNT],[STATUS],[CREATED_BY],[CREATED_ON],[MODIFIED_BY],[MODIFIED_ON] FROM cpcl_work_order_master");
            return product.recordsets;
    }
    catch(error){
        console.log(error);
    }
}

async function get_contractor_code(){
    try{
            let pool = await sql.connect(config);
            let product = await pool.request().query("select contractor_code,contractor_name from cpcl_contractor_master");
            return product.recordsets;
    }
    catch(error){
        console.log(error);
    }
}

async function get_engineer_incharge_code(){
    try{
            let pool = await sql.connect(config);
            let product = await pool.request().query(" select EIC_PRNO from cpcl_engineer_master");
            return product.recordsets;
    }
    catch(error){
        console.log(error);
    }
}

module.exports ={ 
    get_workOrder,
    get_contractor_code,
    get_engineer_incharge_code

}