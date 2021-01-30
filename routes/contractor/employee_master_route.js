const express = require('express');
const router = express.Router();
var dboperations = require('../../database/contractor/employee_master_table');

const getContactor_employee_values = (req,res,next)=>{
    dboperations.get_employee_master().then(result=>{
        var data = result[0]; 
        res.render('contractor_master/employeenew',{data})
    })
}

router.get('/employeenew',(req,res,next)=>{
    dboperations.get_employee_master().then(result=>{
        var data = result[0]; 
        res.render('contractor_master/employeenew',{data})
    })
});

module.exports = { routes:router }