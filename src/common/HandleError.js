const HandleErrorCode = (errorCode) => {
    switch (errorCode) {
        case "01":
            return "Error:01, Username đã tồn tại";
        case "02":
            return "Error:02, Có lỗi trong quá trình tạo admin account";
        case "03":
            return "Error:03, Có lỗi trong quá trình tạo thông tin công ty";
        case "04":
            return "Error:04, Có lỗi trong quá trình reset password account admin công ty";
        case "05":
            return "Error:05, username không tồn tại";
    
        default:
            return "Error: " + errorCode + ", Lỗi không xác định";
    }
}

module.exports = HandleErrorCode

//Auth:
// 01: Username đã tồn tại
// 02: Có lỗi trong quá trình tạo account Admin

//Company:
// 03: Có lỗi trong quá trình tạo công ty

//Account:
//04: Có lỗi khi reset password account
//05:  username không tồn tại