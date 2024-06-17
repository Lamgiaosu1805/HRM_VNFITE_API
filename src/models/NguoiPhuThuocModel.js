const mongoose = require('mongoose')
const Schema = mongoose.Schema

const NguoiPhuThuoc = new Schema({
    fullname: {type: String, required: true},
    dateOfBirth: {type: Date},
    quanHeVoiNhanVien: {type: String, required: true},
    idEmployee: {type: String, required: true}
},{
    timestamps: true
})

module.exports = mongoose.model('nguoiPhuThuoc', NguoiPhuThuoc)