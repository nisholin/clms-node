const express = require('express');
const router = express.Router();

const shift_table_operations = require('../../database/shift_table');
var config = require('../../database/dbconfig');
var sql = require('mssql');



router.get('/shift',(req, res)=>{
	 var user_Id = req.session.userId, user_name = req.session.user_name;
	  if(user_Id == null)
    {
		message = 'Wrong Credentials.';
        res.render('login.ejs',{message: message});
		return;
    }
    else{
		shift_table_operations.get_shift_values().then(result =>{
        var data = result[0];
        //console.log(data);
        res.render('menu_master/shift',{user_Id:user_Id,user_name:user_name,data});
    });
    } 

});

//Shift Add
router.post('/shift/new',(req,res)=>{
    //var new = req.body;
    //console.log(new);
    var shift_name = req.body.shift_name;
	var from_time = req.body.from_time;
    var to_time = req.body.to_time;
    var status = req.body.status;
    //console.log(shift_name);
    //console.log(from_time);
    //console.log(to_time);
    //console.log(status);
    //Date
    var date = new Date();
    var dateString = new Date(date.getTime() - (date.getTimezoneOffset() * 60000 ))
    .toISOString()
    .split("T")[0];
    //console.log(dateString);

    async function getShiftValues(){
        try{
            let pool = await sql.connect(config);
             await pool.request().query("insert into cpcl_shift_master(shift_name,from_time,to_time,status,created_on)  values ('"+shift_name+"','"+from_time+"','"+to_time+"','"+status+"','"+dateString+"')",(req,res)=>{
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

//shift edit
 router.get('/shift_edit/:shiftid',(req, res) => {

    const shiftId = req.params.shiftid;
    //console.log(shiftId);
    
    async function Shiftupdate(){
        try{
                let pool = await sql.connect(config);
                let shift = await pool.request().query(`select * from cpcl_shift_master where id = '${shiftId}'`); 
                return shift.recordsets;
            }
        catch(error){
            console.log(error);
        }
    }   

    var user_Id = req.session.userId, user_name = req.session.user_name;

    Shiftupdate().then(result=>{
        var Shift_edit_data = result[0];
        //console.log(Shift_edit_data);
        res.render('menu_master/shiftedit',{user_Id:user_Id,user_name:user_name,Shift_edit_data:Shift_edit_data});
    })


});


//Shift update process
router.post('/shift/update',(req, res) => {
    var update = req.body;
    //console.table(update);
    //Date
    var date = new Date();
    var dateString = new Date(date.getTime() - (date.getTimezoneOffset() * 60000 ))
    .toISOString()
    .split("T")[0];
    //console.log(dateString);

    async function shiftupdate(){
        try{
            let pool = await sql.connect(config);
            await pool.request().query(`update cpcl_shift_master SET shift_name ='${req.body.shift_name}',
            from_time ='${req.body.from_time}',to_time ='${req.body.to_time}',status ='${req.body.membershipRadios}',
            modified_on='${dateString}' where id ='${req.body.id}'`);
        }
        catch(error){
            console.log(error);
        }
        console.log("Shift Updated Successfully");
    }

    shiftupdate();

    res.redirect('/shift');
});



module.exports= { shift:router } 
