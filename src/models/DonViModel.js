const mongoose = require('mongoose')
const Schema = mongoose.Schema

const DonVi = new Schema({
    name: {type: String, required: true},
    idCompany: {type: String, required: true}
},{
    timestamps: true
})

module.exports = mongoose.model('donVi', DonVi)