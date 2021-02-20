var dboperations = require('../../database/engineer_table');
const express = require('express');
const router = express.Router();

var config = require('../../database/dbconfig');
var sql = require('mssql');


 
//Engineer table view query
router.get('/engineer',(req, res)=>{
	 var user_Id = req.session.userId, user_name = req.session.user_name;
	  if(user_Id == null)
    {
		message = 'Wrong Credentials.';
        res.render('login.ejs',{message: message});
		return;
    }
    else
	{
		dboperations.getEngvalues().then(result =>{                
		var data = result[0];
		res.render('menu_master/engineer',{user_Id:user_Id,user_name:user_name,data:data});
		})
    } 
    
});

//New Enginner Creation process
router.post('/engineer/new',(req,res,next)=>{
    var eic_prno = req.body.eic_prno;
    var name = req.body.name;
	var department = req.body.department;
	var designation = req.body.designation;
	var email = req.body.email;
	var mobile = req.body.mobile;
	var status = req.body.status;

	
    async function getEngvalues(){
        try{
            let pool = await sql.connect(config);
             await pool.request().query("insert into cpcl_engineer_master (EIC_PRNO,name,department,designation,email,mobile,status) values ('"+eic_prno+"','"+name+"','"+department+"','"+designation+"','"+email+"','"+mobile+"','"+status+"')",(req,res)=>{
                 console.log("successfully inserted");
             });
            //return products.recordsets;
        }
        catch(error){
            console.log(error);
        }
    }
    getEngvalues();
	res.redirect("/engineer");
	 
});

//single engineer  data edit page   
router.get('/Engineer_edit/:engineerId',(req, res) => {

    const engineerId = req.params.engineerId;

    async function Engineupdate(){
        try{
                let pool = await sql.connect(config);
                let products = await pool.request().query(`select * from cpcl_engineer_master where id = ${engineerId}`); 
                return products.recordsets;
            }
        catch(error){
            console.log(error);
        }
    }   

    var user_Id = req.session.userId, user_name = req.session.user_name;

    Engineupdate().then(result=>{
        var Engineer_edit_data = result[0];
        res.render('menu_master/engineeredit',{user_Id:user_Id,user_name:user_name,Engineer_edit_data:Engineer_edit_data});
    })


});

//engineer update process
router.post('/update',(req, res) => {
    var data = req.body;
    //console.table(data);

    async function Engineupdate(){
        try{
            let pool = await sql.connect(config);
            let products = await pool.request().query(`update cpcl_engineer_master SET EIC_PRNO='${req.body.eic_prno}',
            name='${req.body.name}',department='${req.body.department}',designation='${req.body.designation}',
            email='${req.body.email}',mobile='${req.body.mobile}'   where id ='${req.body.id}'`); 
            return products.recordsets;
        }
        catch(error){
            console.log(error);
        }
        console.log("Engineer Updated Successfully");
    } 

    Engineupdate();

    res.redirect('/engineer');
});






module.exports = { engineer : router}


