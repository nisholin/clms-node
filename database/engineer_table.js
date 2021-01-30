var config = require('./dbconfig');

var sql = require('mssql');


async function getEngvalues(){
    try{
            let pool = await sql.connect(config);
            let products = await pool.request().query("select * from cpcl_engineer_master");
            return products.recordsets;
    }
    catch(error){
        console.log(error);
    }
}

//let data = {eic_prno: req.body.eic_prno, name: req.body.name, department: req.body.department, designation: req.body.designation, email: req.body.email, mobile: req.body.mobile, head1: req.body.head1, head2: req.body.head2};

/* let sql = "update cpcl_engineer_master SET eic_prno='"+req.body.eic_prno+"',  name='"+req.body.name+"',  department='"+req.body.department+"', designation='"+req.body.designation+"',  email='"+req.body.email+"',  mobile='"+req.body.mobile+"',  head1='"+req.body.head1+"',  head2='"+req.body.head2+"'   where id ="+userId; */

/* 
INSERT into cpcl_engineer_master(eic_prno, name, department, designation, email, mobile, head1, head2)Values(?,?,?,?,?,?,?,?)[eic_prno, name, department, designation, email, mobile, head1, head2]; */


module.exports = {
    getEngvalues
}

