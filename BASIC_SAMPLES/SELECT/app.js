const express = require('express');
const app = express();

app.set('view engine','ejs');

const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const mysql = require('mysql');

const connection = mysql.createConnection({

    host:'localhost',
    user:'root',
    password:'',
    database:'dynamic'
});

const con = connection.connect((err)=>{
    if(err) throw err;
    else console.log('DB Connected');
})

app.get('/',(req,res)=>{

    let sql = "SELECT * FROM clients";
    let query = connection.query(sql, (err, rows) => {
        if(err) throw err;
        res.render('main', {
            title : 'CRUD Operation using NodeJS / ExpressJS / MySQL',
            users : rows
        });
    });
});

var order = require('../SELECT/order');
app.use("/users/address", order.getUserAddress); 

app.listen(3600,console.log(`server runnning on 3600`));