const express = require('express');
const router = express.Router();

const shift_table_operations = require('../../database/shift_table');
var config = require('../../database/dbconfig');
var sql = require('mssql');

/*const shift = (req, res, next) => {
    
}*/


router.get('/shift',(req, res, next)=>{
	shift_table_operations.get_shift_values().then(result =>{
        var data = result[0];
        res.render('menu_master/shift',{data});
    })
});

router.post('/shift/new',(req,res,next)=>{
    var shift_name = req.body.shift_name;
   
	 var from_time = req.body.from_time;
	  var to_time = req.body.to_time;
	    var status = req.body.status;
    console.log(shift_name);
	  console.log(from_time);
	    console.log(to_time);
		console.log(status);
    async function getShiftValues(){
        try{
            let pool = await sql.connect(config);
             await pool.request().query("insert into cpcl_shift_master(shift_name,from_time,to_time,status)  values ('"+shift_name+"','"+from_time+"','"+to_time+"','"+status+"')",(req,res)=>{
                 console.log("successfully inserted");
             });
            //return products.recordsets;
        }
        catch(error){
            console.log(error);
        }
    }
    getShiftValues();
	 res.redirect("/shift")
});



module.exports= { 
	
		routes:router		
}  