var config = require('./dbconfig');

var sql = require('mssql');

module.exports = {

    getUserAddress: (req, res) => {
        var selecteduser = req.query.selectedId;
console.log(selecteduser);
        let sql = "select * from cpcl_work_order_master where CCODE='" + selecteduser + "'";
        let query = connection.query(sql, (err, rows) => {
        if(err) throw err;
        res.send(rows);
    });


     }
}
