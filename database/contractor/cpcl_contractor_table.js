var config = require('../dbconfig');

var sql = require ('mssql');


async function contractor_data(){
    try{
            let pool = await sql.connect(config);
            let products = await pool.request().query("SELECT [contractor_code],[contractor_name],[address],[prefix_code],[proprietor],[owner] ,[md],[partner],[contractor_mail],[ESI_Code_No],[PF_Code_No],[Contractor_PAN_No],[Contractor_LIN],[Mobile_No],[Name_of_person],[compliance_Mail_id],[hr_department],[status],[created_by],[created_on] FROM [CLMS_V].[dbo].[cpcl_contractor_master]");
            return products.recordsets;
    }
    catch(error){
        console.log(error);
    }
}
/*let data = {Contractor_Code: req.body.Contractor_Code,Contractor_Name: req.body.Contractor_Name,Address: req.body.Address,Prefix_Code: req.body.Prefix_Code,proprietor: req.body.proprietor,owner: req.body.owner,MD: req.body.MD,partner: req.body.partner,Contractor_Email: req.body.Contractor_Email,ESI_Code_No: req.body.ESI_Code_No,PF_Code_No: req.body.PF_Code_No,Contractor_PAN_No: req.body.Contractor_PAN_No,Contractor_LIN: req.body.Contractor_LIN,Mobile_No: req.body.Mobile_No,Name_of_person: req.body.Name_of_person*/

/* let sql = "update cpcl_contractor_master SET Contractor_Code='"+req.body.Contractor_Code+"',  Contractor_Name='"+req.body.Contractor_Name+"',  Address='"+req.body.Address+"', Prefix_Code='"+req.body.Prefix_Code+"',  proprietor='"+req.body.proprietor+"',  owner='"+req.body.owner+"',  MD='"+req.body.MD+"',  partner='"+req.body.partner+"',  Contractor_Email='"+req.body.Contractor_Email+"',  ESI_Code_No='"+req.body.ESI_Code_No+"',  PF_Code_No='"+req.body.PF_Code_No+"', Contractor_PAN_No='"+req.body.Contractor_PAN_No+"', Contractor_LIN='"+req.body.Contractor_LIN+"', Mobile_No='"+req.body.Mobile_No+"', Name_of_person='"+req.body.Name_of_person+"' where id ="+userId; */

/* 
INSERT into cpcl_contractor_master(Contractor_Code, Contractor_Name, Address, Prefix_Code, proprietor, owner, MD, partner, Contractor_Email, ESI_Code_No, PF_Code_No, Contractor_PAN_No, Contractor_LIN, Mobile_No, Name_of_person)Values(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)[Contractor_Code, Contractor_Name, Address, Prefix_Code, proprietor, owner, MD, partner, Contractor_Email, ESI_Code_No, PF_Code_No, Contractor_PAN_No, Contractor_LIN, Mobile_No, Name_of_person]; */

module.exports = { contractor_data }