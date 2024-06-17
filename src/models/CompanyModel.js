const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Company = new Schema({
    name: { type: String, required: true},
    shortName: {type: String, required: true},
    logo: {type: String, default: ""},
    address: {type: String, default: ""},
},{
    timestamps: true
})

module.exports = mongoose.model('company', Company)