var dboperations = require('../../database/gate_table');
const express = require('express');
const router = express.Router();

var config = require('../../database/dbconfig');
var sql = require('mssql');


//gate_Master
router.get('/gate',(req,res,next)=>{
	 var user_Id = req.session.userId, user_name = req.session.user_name;
	  if(user_Id == null)
    {
		message = 'Wrong Credentials.';
        res.render('login.ejs',{message: message});
		return;
    }
    else{
		dboperations.getGateValues().then(result=>{
        var data = result[0];
        //console.table(data);
        res.render('menu_master/gate',{user_Id:user_Id,user_name:user_name,data});
    });
    }  
});

//Gate Insert
router.post('/gate/new',(req,res,next)=>{
    var name = req.body.name;
    var status = req.body.status;
    console.log(name);
    async function getGateValues(){
        try{
            let pool = await sql.connect(config);
             await pool.request().query("insert into cpcl_gate_master values ('"+name+"','"+status+"')",(req,res)=>{
                 console.log("successfully inserted");
             });
            //return products.recordsets;
        }
        catch(error){
            console.log(error);
        }
    }
    getGateValues();
	 
});

//Edit View
router.get('/gate_edit/:gateid',(req, res) => {

    const gateId = req.params.gateid;

    async function gateupdate(){
        try{
                let pool = await sql.connect(config);
                let products = await pool.request().query(`select * from cpcl_gate_master where id = ${gateId}`); 
                return products.recordsets;
            }
        catch(error){
            console.log(error);
        }
    }   

    var user_Id = req.session.userId, user_name = req.session.user_name;

    gateupdate().then(result=>{
        var gate_edit_data = result[0];
        res.render('menu_master/gateedit',{user_Id:user_Id,user_name:user_name,gate_edit_data:gate_edit_data});
    })


});


//Gate update process
router.post('/gate/update',(req, res) => {
    var data = req.body;
    console.table(data);

    async function gateupdate(){
        try{
            let pool = await sql.connect(config);
            let products = await pool.request().query(`update cpcl_gate_master SET name='${req.body.name}',
            status='${req.body.membershipRadios}' where id ='${req.body.id}'`); 
            return products.recordsets;
        }
        catch(error){
            console.log(error);
        }
        console.log("Gate Updated Successfully");
    } 
gateupdate();

    res.redirect('/gate');
});



module.exports = { 
	gate:router
}