const express = require('express');
const router = express.Router();

var config = require('../../database/dbconfig');
var sql = require('mssql');



router.get('/form_b_wage_register',(req,res)=>{
    res.render('pay_roll/form_b_wage_reg')
})



module.exports = {
    formbwage : router
}