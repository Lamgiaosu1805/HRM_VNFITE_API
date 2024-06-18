const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Account = new Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true},
    roleId: {type: Number, required: true},
    //roleId = 1 : Admin Hệ thống
    // = 2: Admin hỗ trợ hệ thống
    // = 3: Admin Công ty
    // = 4: Account Employee
    isResetPassword: {type: Boolean, default: true},
    isActive: {type: Boolean, default: true},
    idCompany: {type: String, default: ""},
    companyName: {type: String, default: ""},
    idEmployee: {type: String, default: ""}
},{
    timestamps: true
})

module.exports = mongoose.model('account', Account)