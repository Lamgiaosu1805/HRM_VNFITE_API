const { default: axios } = require("axios")
const AccountModel = require("../models/AccountModel")
const bcrypt = require('bcrypt');

const AuthController = {
    createAccoutAdmin: async (req, res, next) => {
        const body = req.body
        try {
            const user = await AccountModel.findOne({username: body.username})
            if(user) {
                res.json({
                    status: false,
                    message: "username đã tồn tại"
                })
            }
            else {
                const salt = await bcrypt.genSalt(10)
                const hashed = await bcrypt.hash(body.password, salt)
                const newAccount = new AccountModel({
                    username: body.username,
                    password: hashed,
                    roleId: 1
                })
                await newAccount.save()
                res.json({
                    status: true
                })
            }
        } catch (error) {
            console.log(error)
            res.json({
                status: false
            })
        }
    }
}
module.exports = AuthController