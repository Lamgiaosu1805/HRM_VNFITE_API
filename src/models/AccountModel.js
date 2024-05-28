const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Account = new Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true},
    roleId: {type: Number, required: true},
    //roleId = 0 : Admin Hệ thống
    // = 1: Admin hỗ trợ hệ thống
    // = 2: Admin Công ty
    // = 3: Account Employee
    isResetPassword: {type: Boolean, default: true},
    isActive: {type: Boolean, default: true},
},{
    timestamps: true
})

module.exports = mongoose.model('account', Account)