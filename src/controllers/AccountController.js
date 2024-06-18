const { FailureResponse, SuccessResponse } = require("../common/ResponseRequest")
const { generateRandomPassword } = require("../common/utils")
const AccountModel = require("../models/AccountModel")
const bcrypt = require('bcrypt');
const ExcelJS = require('exceljs');
const DonViModel = require("../models/DonViModel");
const PhongBanModel = require("../models/PhongBanModel");
const ChucDanhModel = require("../models/ChucDanhModel");
const CapBacModel = require("../models/CapBacModel");
const EmployeeInfoModel = require("../models/EmployeeInfoModel");
const { default: mongoose } = require("mongoose");

const AccountController = {
    resetPasswordAdminCompany: async (req, res, next) => {
        const body = req.body
        try {
            const account = await AccountModel.findOne({username: body.username})
            if(account) {
                const newPassword = generateRandomPassword()
                const salt = await bcrypt.genSalt(10)
                const hashedPassword = await bcrypt.hash(newPassword, salt)
                await account.updateOne({password: hashedPassword})
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
    },
    createAccountWithExcel: async (req, res, next) => {
        const {body, user, file} = req
        if (!req.file) {
            return res.status(400).send('No file uploaded.');
        }
        else {
            const session = await mongoose.startSession();
            session.startTransaction();
            try {
                const currentAccount = await AccountModel.findById(user.id)
                const companyId = currentAccount.idCompany
                const companyName = currentAccount.companyName
                const workbook = new ExcelJS.Workbook();
                await workbook.xlsx.load(req.file.buffer);
                const worksheet = workbook.getWorksheet(1); // Lấy worksheet đầu tiên
                let headers = [];
                let data = [];
                const promises = [];
                worksheet.eachRow((row, rowNumber) => {
                    if (rowNumber === 1) {
                        headers = row.values.slice(1); // Bỏ giá trị đầu tiên vì nó là null
                    } else {
                        let rowData = {};
                        row.values.slice(1).forEach((value, index) => {
                            rowData[headers[index]] = value;
                        });
                        promises.push(DonViModel.findOneAndUpdate(
                            { name: rowData.donViLamViec, idCompany: companyId },
                            { name: rowData.donViLamViec, idCompany: companyId },
                            { upsert: true, new: true }
                        ));
                        promises.push(PhongBanModel.findOneAndUpdate(
                            { name: rowData.phongBan, idCompany: companyId },
                            { name: rowData.phongBan, idCompany: companyId },
                            { upsert: true, new: true }
                        ));
                        promises.push(ChucDanhModel.findOneAndUpdate(
                            { name: rowData.ChucDanh, idCompany: companyId },
                            { name: rowData.ChucDanh, idCompany: companyId },
                            { upsert: true, new: true }
                        ));
                        promises.push(CapBacModel.findOneAndUpdate(
                            { name: rowData.capBac, idCompany: companyId },
                            { name: rowData.capBac, idCompany: companyId },
                            { upsert: true, new: true }
                        ));
                        promises.push(CapBacModel.findOneAndUpdate(
                            { name: rowData.capBac, idCompany: companyId },
                            { name: rowData.capBac, idCompany: companyId },
                            { upsert: true, new: true }
                        ));
                        data.push(rowData);
                    }
                });
                await Promise.all(promises);
               
                data.map(async (item, index) => {
                    try {
                        const employee = new EmployeeInfoModel({
                            maNV: item.maNV,
                            fullname: item.fullname,
                            cccdNumber: item.soCCCD,
                            phoneNumber: "0379137857",
                            address: item.diachi,
                            dateOfBirth: item.ngaysinh,
                            idCompany: companyId,
                            basicSalary: item.luongcoban,
                            maSoThue: item.maSoThue,
                            education: item.trinhDoHocVan,//Trình độ học vấn
                            maBHXH: item.maBHXH,
                            method: item.hinhThucLamViec, //Thực tập, Thử việc, chính thức fulltime, partime,
                            stk: item.stk,
                            bankName: item.nganhang,
                            position: [
                                {
                                    donVi: item.donViLamViec,
                                    phongBan: item.phongBan,
                                    chucDanh: item.ChucDanh,
                                    capBac: item.capBac
                                }
                            ],
                        })
                        const newEmployee = await employee.save({session})
                        const account = new AccountModel({
                            username: "lamnk1@gmail.com",
                            password: "2312312313123",
                            idCompany: companyId,
                            companyName: companyName,
                            roleId: 4,
                            idEmployee: newEmployee._id
                        })
                        await account.save({ session })
                    } catch (error) {
                        console.log(error)
                    }
                })
                await session.commitTransaction();
                res.json({
                    total: data.length,
                    data: data
                });
            } catch (error) {
                await session.abortTransaction();
                console.log(error)
            } finally {
                session.endSession()
            }
        }
    }
}

module.exports = AccountController