const AccountModel = require("../models/AccountModel")
const bcrypt = require('bcrypt');
const { SuccessResponse, FailureResponse } = require("../common/ResponseRequest");
const jwt = require('jsonwebtoken');
const ExcelJS = require('exceljs');
const pool = require('../config/connectMysql')

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
            //   password, stk, money, status, created_at, updated_at, user_name_cmt, address_cmt, birthday_cmt, issued_by_cmt, gender, is_ekyc_pvcb, active
            worksheet.eachRow((row, rowNumber) => {
                if (rowNumber === 1) {
                    headers = row.values.slice(1); // Bỏ giá trị đầu tiên vì nó là null
                } else {
                    let rowData = {};
                    row.values.slice(1).forEach((value, index) => {
                        rowData[headers[index]] = value;
                    });
                    // password: passwordReset01@
                    const sql = 'INSERT INTO users (name, phone, code, birthday, role_id, password, stk, money, status, created_at, updated_at, user_name_cmt, cmt_number, address_cmt, birthday_cmt, issued_by_cmt, gender, active, is_ekyc_pvcb, number_cmtnd) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
                    const values = [rowData.Ho_va_ten_KH, rowData.Dien_thoai, rowData.Dien_thoai, rowData.Ngay_sinh, 3, "47144a26283f27c015712f4066c261c5", rowData.Stk_NH, 0.00, 1, "2022-06-13", "2022-06-13", rowData.Ho_va_ten_KH, rowData.CMND_KH, rowData.Dia_chi_KH, rowData.Ngay_sinh, rowData.Noi_cap, 1, 0, "done", rowData.CMND_KH];
                    pool.query(sql, values, (err, results) => {
                        if (err) {
                        console.error('Lỗi khi insert dữ liệu:', err);
                        // res.status(500).send('Lỗi server');
                        } else {
                        console.log('Insert dữ liệu thành công:', results);
                        //   res.status(200).send('Insert thành công');
                        }
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