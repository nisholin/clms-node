var dboperations = require('../../database/engineer_table');
const express = require('express');
const router = express.Router();

var config = require('../../database/dbconfig');
var sql = require('mssql');

router.get('/home',(req,res)=>{
    async function getSidebar(){
        try{
            let pool = await sql.connect(config);
            await pool.request().query("select menu_name from menu_master");
            return products.recordsets;
        }
        catch(error){
            console.log(error);
        }
    }
    getSidebar().then(result=>{
        var master = result[0];
        res.send(master);
    });
	//res.redirect("/engineer");
})