const express = require('express');
const router = express.Router();

const shift_table_operations = require('../../database/shift_table');


const shift = (req, res, next) => {
    
}


router.get('/shift',(req, res, next)=>{
	shift_table_operations.get_shift_values().then(result =>{
        var data = result[0];
        res.render('menu_master/shift',{data});
    })
});





module.exports= { 
		shift,
		routes:router		
}  