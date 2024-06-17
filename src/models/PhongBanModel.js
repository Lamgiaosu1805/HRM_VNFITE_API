const mongoose = require('mongoose')
const Schema = mongoose.Schema

const PhongBan = new Schema({
    name: {type: String, required: true},
    idDonVi: {type: String, required: true}
},{
    timestamps: true
})

module.exports = mongoose.model('phongBan', PhongBan)