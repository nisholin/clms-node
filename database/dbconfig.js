const config = {
    server:'127.0.0.1',
    user:'sqladmin',
    password:'Mykeyin@123',
    port :1433,
    database:'CLMS_V',
    options:{
        encrypt:true,
        trustedConnection:true,
        enableArithPort:true,
        enableArithAbort: true,
        instancename:'BSPLNEWASSETSRV\SQLEXPRESS'

    }
    
}

module.exports = config;