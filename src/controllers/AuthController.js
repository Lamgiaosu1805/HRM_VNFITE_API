const AccountModel = require("../models/AccountModel")
const bcrypt = require('bcrypt');
const { SuccessResponse, FailureResponse } = require("../utils/ResponseRequest");

const AuthController = {
    createAccoutAdmin: async (req, res, next) => {
        const body = req.body
        try {
            const user = await AccountModel.findOne({username: body.username})
            if(user) {
                res.json(FailureResponse("01"))
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
                res.json(SuccessResponse())
            }
        } catch (error) {
            console.log(error)
            res.json(FailureResponse("02", error))
        }
    }
}
module.exports = AuthController