var config = require('./dbconfig');

var sql = require('mssql');

async function get_shift_values(){
    try{
            let pool = await sql.connect(config);
            let products = await pool.request().query("select * from cpcl_shift_master");
            return products.recordsets;
    }
    catch(error){
        console.log(error);
    }
}




module.exports={    get_shift_values  }