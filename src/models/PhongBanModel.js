const mongoose = require('mongoose')
const Schema = mongoose.Schema

const PhongBan = new Schema({
    name: {type: String, required: true},
    idCompany: {type: String, required: true}
},{
    timestamps: true
})

module.exports = mongoose.model('phongBan', PhongBan)