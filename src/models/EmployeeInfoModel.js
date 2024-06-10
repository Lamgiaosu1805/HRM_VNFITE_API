const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Employee = new Schema({
    maNV: {type: String, required: true},
    fullname: { type: String, required: true },
    potraitImage: { type: String },
    cccd_number: {type: String, required: true},
    phoneNumber: {type: String, required: true},
    address: {type: String, required: true},
    dateOfBirth: {type: Date, required: true},
    idCompany: {type: String, required: true},
    basicSalary: {type: Number, required: true},
},{
    timestamps: true
})

module.exports = mongoose.model('employee', Employee)