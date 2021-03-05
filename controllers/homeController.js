var dboperations = require('../database/engineer_table');


const indexView = (req, res, next) => {
    res.render('home');
}

const iconsView = (req, res, next) => {
    res.render('icons',);
}
//CONTRACTOR
const contractorNew = (req,res,next) => {
    res.render('contractor_master/contractornew');
}
const employeenew = (req,res,next) => {
    res.render('contractor_master/employeenew');
}
const workordernew = (req,res,next) => {
    res.render('contractor_master/workordernew');
}
const eicView = (req,res,next) => {
    res.render('contractor_master/eic_master');
}
//PASS
const passReqOne = (req,res,next) => {
    res.render('pass/pass_request_1');
}
const passReqTwo = (req,res,next) => {
    res.render('pass/pass_request_2');
}
const passReqThree = (req,res,next) => {
    res.render('pass/pass_request_3');
}
const printPass = (req,res,next) => {
    res.render('pass/print_pass');
}
//ATTENDANCE
const attendance = (req,res,next) => {
    res.render('attendance/attendance');
}
const attendance_in_out = (req,res,next) => {
    res.render('attendance/attendance_in_out');
}
const attendance_edit = (req,res,next) => {
    res.render('attendance/attendance_edit');
}
//PAY ROLL
/*const payGeneration = (req,res,next) => {
    res.render('pay_roll/pay_roll_generation');
}*/
const payGeneration = (req,res,next) => {
    res.render('pay_roll/pay_roll_generationnew');
}
//Reports
const contractorMaster = (req,res,next) => {
    res.render('reports/contractor_master');
}
const employeeMaster = (req,res,next) => {
    res.render('reports/employee');
}
const inOut = (req,res,next) => {
    res.render('reports/in_out');
}
const worksOrder = (req,res,next) => {
    res.render('reports/work_order');
}
const eicReport = (req,res,next) => {
    res.render('reports/eic_reports');
}
//role

const role=(req,res,next)=>{
    res.render('role/role_new');
}

module.exports = {
    indexView,
    iconsView,
    //Contractor Master
    contractorNew,
    employeenew,
    workordernew,
    eicView,
    //Pass
    passReqOne,
    passReqTwo,
    passReqThree,
    printPass,
    //Attendance
    attendance,
    attendance_in_out,
    attendance_edit,
    //Pay Roll
    payGeneration,
    //Reports
    contractorMaster,
    employeeMaster,
    inOut,
    worksOrder,
    eicReport,
    //role
    role
}