const AccountModel = require("../models/AccountModel")
const bcrypt = require('bcrypt');
const { SuccessResponse, FailureResponse } = require("../common/ResponseRequest");
const jwt = require('jsonwebtoken');
const ExcelJS = require('exceljs');

const genAccessToken = (user) => {
    return jwt.sign({
        id: user._id,
        username: user.username,
        roleId: user.roleId,
    },
        process.env.SECRET_KEY,
        {
            expiresIn: "365d"
        }
    )
}

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
    },
    signIn: async (req, res, next) => {
        const body = req.body
        try {
            const user = await AccountModel.findOne({username: body.username})
            if(!user) {
                res.json(FailureResponse("05"))
            }
            else {
                const validPassWord = await bcrypt.compare(
                    body.password,
                    user.password
                );
                if(!validPassWord) {
                    res.json(FailureResponse("07"))
                }
                else {
                    const accessToken = genAccessToken(user);
                    const {password, ...others} = user._doc;
                    res.json(SuccessResponse({...others, accessToken}))
                }
            }
        } catch (error) {
            console.log(error)
            res.json(FailureResponse("06", error))
        }
    },
    test: async (req, res, next) => {
        if (!req.file) {
            return res.status(400).send('No file uploaded.');
        }
        try {
            const workbook = new ExcelJS.Workbook();
            await workbook.xlsx.load(req.file.buffer);
    
            const worksheet = workbook.getWorksheet(1); // Lấy worksheet đầu tiên
            let headers = [];
            let data = [];

            worksheet.eachRow((row, rowNumber) => {
                if (rowNumber === 1) {
                    headers = row.values.slice(1); // Bỏ giá trị đầu tiên vì nó là null
                } else {
                    let rowData = {};
                    row.values.slice(1).forEach((value, index) => {
                        rowData[headers[index]] = value;
                    });
                    data.push(rowData);
                }
            });
    
            res.json({
                total: data.length,
                data: data
            });
        } catch (err) {
            console.log(err)
            res.status(500).send('Error reading Excel file.');
        }
    }
    
}
module.exports = AuthController