const express = require('express');
const router = express.Router();

var config = require('../../database/dbconfig');
var sql = require('mssql');




router.get('/wage_slip',(req,res)=>{
    res.render('pay_roll/wage_slip')
})



module.exports = {
    wageslip : router
}