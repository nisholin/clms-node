var dboperations = require('../../database/engineer_table');
const express = require('express');
const router = express.Router();

var config = require('../../database/dbconfig');
var sql = require('mssql');


 // MENU MASTER
/* const engineer = (req, res, next) => {
    dboperations.getEngvalues().then(result =>{                
        var data = result[0];
    res.render('menu_master/engineer',{data});
})
}; */
 

router.get('/engineer',(req, res)=>{
    dboperations.getEngvalues().then(result =>{                
    var data = result[0];
    res.render('menu_master/engineer',{data});
})
	//res.render('menu_master/engineer');
});

router.post('/engineer/update',(req,res)=>{
 var id = req.body;
 //console.log(id);
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
   /*  console.log(eic_prno);
	console.log(name);
	console.log(department);
	console.log(designation);
	console.log(email);
    console.log(mobile);
    console.log(status);
	 */
	
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


/* router.post('/engineer/update', function (req, res, next) {
    const id = req.body;
    //console.log(id);
    async function getGateValue() {
        try {
            let pool = await sql.connect(config);
            let products = await pool.request().query("select * from cpcl_engineer_master where id = '1'");
            //console.log(products); 
                var view = products[0];
            res.render('menu_master/engineer',{view});
        }
        catch (error) {
            console.log(error);
        }
    }
    var data = getGateValue();
    res.send(data);
}); 

 */
module.exports = {
    engineer:router    
}