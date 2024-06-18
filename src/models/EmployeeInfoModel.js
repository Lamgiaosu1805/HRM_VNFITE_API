const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Employee = new Schema({
    maNV: {type: String, required: true},
    fullname: { type: String, required: true },
    potraitImage: { type: String },
    cccdNumber: {type: String, required: true},
    phoneNumber: {type: String, required: true},
    address: {type: String, required: true},
    dateOfBirth: {type: Date, required: true},
    idCompany: {type: String, required: true},
    basicSalary: {type: Number, required: true},
    maSoThue: {type: String},
    education: {type: String},//Trình độ học vấn
    maBHXH: {type: String},
    method: {type: String, required: true}, //Thực tập, Thử việc, chính thức fulltime, partime,
    stk: {type: String},
    bankName: {type: String},
    position: {type: Array},
    // position sẽ có dạng : [
    //     "đơn vị": {
    //         "idDonVi": "adsdasd",
    //         "tenDonVi": "fsdfsdfsdf"
    //     },
    //     ....
    // ]
    nguoiPhuThuoc: {type: Array, default: []}
},{
    timestamps: true
})

module.exports = mongoose.model('employee', Employee)