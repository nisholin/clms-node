var config = require('../dbconfig');
var sql = require ('mssql');



async function contractor_mail_data(){
    try{
            let pool = await sql.connect(config);
            let products = await pool.request().query("SELECT id, CCODE, CNAME, primary_mail, secondary_mail_one, secondary_mail_two, secondary_mail_three, secondary_mail_four, secondary_mail_five, secondary_mail_six FROM contractor_email");
            return products.recordsets;
    }
    catch(error){
        console.log(error);
    }
}


module.exports = { contractor_mail_data }