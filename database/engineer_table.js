var config = require('./dbconfig');

var sql = require('mssql');


async function getEngvalues(){
    try{
            let pool = await sql.connect(config);
            let products = await pool.request().query("select * from cpcl_engineer_master");
            return products.recordsets;
    }
    catch(error){
        console.log(error);
    }
}





module.exports = {
    getEngvalues
}

