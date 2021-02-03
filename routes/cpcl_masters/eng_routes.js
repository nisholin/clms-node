var dboperations = require('../../database/engineer_table');
const express = require('express');
const router = express.Router();

var config = require('../../database/dbconfig');
var sql = require('mssql');


 

router.get('/engineer',(req, res)=>{
	/*  var user_Id = req.session.userId, user_name = req.session.user_name;
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
		res.render('menu_master/engineer',{data});
		})
    }  */
	dboperations.getEngvalues().then(result =>{                
		var data = result[0];
		res.render('menu_master/engineer',{data});
		})
});

router.post('/engineer/update',(req,res)=>{
 var id = req.body;
    async function Engvalues(){
        try{
                let pool = await sql.connect(config);
                let products = await pool.request().query("select * from cpcl_engineer_master where id='1'");
                return products.recordsets;
        }
        catch(error){
            console.log(error);
        }
    }
    Engvalues().then(result =>{                
        var editData = result[0];
        console.table(editData);
        res.render('menu_master/engineeredit',{editData});
})
})


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
	res.redirect("/engineer")
	 
});




module.exports = { engineer : router}


