const { FailureResponse, SuccessResponse } = require("../common/ResponseRequest")
const { generateRandomPassword } = require("../common/utils")
const AccountModel = require("../models/AccountModel")
const bcrypt = require('bcrypt');

const AccountController = {
    resetPasswordAdminCompany: async (req, res, next) => {
        const body = req.body
        // console.log(body)
        try {
            const account = await AccountModel.findOne({username: body.username})
            if(account) {
                const newPassword = generateRandomPassword()
                const salt = await bcrypt.genSalt(10)
                const hashedPassword = await bcrypt.hash(newPassword, salt)
                await account.updateOne({username: body.username}, {password: hashedPassword})
                res.json(SuccessResponse({
                    newPassword: newPassword
                }))
            }
            else {
                res.json(FailureResponse("05"))
            }
        } catch (error) {
            console.log(error)
            res.json(FailureResponse("04", error))
        }
    }
}

module.exports = AccountController