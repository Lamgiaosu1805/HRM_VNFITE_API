const mongoose = require('mongoose')
const Schema = mongoose.Schema

const HopDongLaoDong = new Schema({
    idEmployee: {type: String, required: true},
    type: {type: String},//Xác định tgian hay ko xác định tgian
    soHopDong: {type: String},
    ngayKyHDLD: {type: Date},
    ngayHetHan: {type: Date},
    ngayThamGia: {type: Date},
    linkFileHopDong: {type: String}
},{
    timestamps: true
})

module.exports = mongoose.model('hopDongLaoDong', HopDongLaoDong)