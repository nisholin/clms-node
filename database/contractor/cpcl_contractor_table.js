var config = require('../dbconfig');

var sql = require ('mssql');


async function contractor_data(){
    try{
            let pool = await sql.connect(config);
            let products = await pool.request().query("SELECT [id],[contractor_code],[contractor_name],[address],[prefix_code],[proprietor],[owner] ,[md],[partner],[contractor_mail],[ESI_Code_No],[PF_Code_No],[Contractor_PAN_No],[Contractor_LIN],[Mobile_No],[Name_of_person],[compliance_Mail_id],[hr_department],[status],[created_by],[created_on] FROM cpcl_contractor_master");
            return products.recordsets;
    }
    catch(error){
        console.log(error);
    }
}






module.exports = { contractor_data }