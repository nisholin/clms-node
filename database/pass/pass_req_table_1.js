var config = require('../dbconfig');

var sql = require('mssql');



async function get_contractor(){
	try{
		let pool = await sql.connect(config);
		let products = await pool.request().query("select * from pass_request_master");
		return products.recordsets;
	}
	catch(error){
		console.log(error);
	}
}




module.exports = {
	get_contractor
}