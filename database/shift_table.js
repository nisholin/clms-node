var config = require('./dbconfig');

var sql = require('mssql');

async function get_shift_values(){
    try{
            let pool = await sql.connect(config);
            let shift = await pool.request().query("select * from cpcl_shift_master");
            return shift.recordsets;
    }
    catch(error){
        console.log(error);
    }
}




module.exports={    get_shift_values  }