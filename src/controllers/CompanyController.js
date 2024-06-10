const mongoose = require('mongoose');
const CompanyModel = require('../models/CompanyModel');
const { FailureResponse, SuccessResponse } = require('../common/ResponseRequest');
const bcrypt = require('bcrypt');
const AccountModel = require('../models/AccountModel');
const Utils = require('../common/utils');

const CompanyController = {
    createCompany: async (req, res, next) => {
        const body = req.body
        const session = await mongoose.startSession();
        session.startTransaction();
        try {
            const newCompany = new CompanyModel({
                name: body.name,
                logo: body.logo,
                shortName: body.shortName
            })
            const dataCompanyNew = await newCompany.save({session})
            const numberCount = await CompanyModel.countDocuments()
            const adminCompany = await AccountModel.findOne({username: "admin_company" + numberCount})
            if(adminCompany) {
                await session.abortTransaction();
                session.endSession();
                res.json(FailureResponse("01"))
            }
            else {
                const password = Utils.generateRandomPassword();
                const salt = await bcrypt.genSalt(10)
                const hashed = await bcrypt.hash(password, salt)
                const newCompanyAcount = new AccountModel({
                    username: "admin_company" + numberCount,
                    password: hashed,
                    companyName: dataCompanyNew.name,
                    idCompany: dataCompanyNew._id,
                    roleId: 3
                })
                const dataAdminCompany = await newCompanyAcount.save({session})
                await session.commitTransaction();
                session.endSession()
                res.json(SuccessResponse({
                    username: dataAdminCompany.username,
                    password: password
                }))
            }
            

        } catch (error) {
            await session.abortTransaction();
            session.endSession();
            console.log(error)
            res.json(FailureResponse("03", error))
        }
    }
}

module.exports = CompanyController