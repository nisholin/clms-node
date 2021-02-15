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
});

module.exports = {

    getUserAddress: (req, res) => {
        var selecteduser = req.query.selectedId;

        let sql = "SELECT * FROM regions WHERE client_id = '" + selecteduser + "'";
        let query = connection.query(sql, (err, rows) => {
        if(err) throw err;
        res.send(rows);
    });


     }
}