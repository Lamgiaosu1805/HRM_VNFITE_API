const HandleErrorCode = (errorCode) => {
    switch (errorCode) {
        case "01":
            return "Error:01, Username đã tồn tại";
        case "02":
            return "Error:02, Có lỗi trong quá trình tạo admin account";
        case "03":
            return "Error:03, Có lỗi trong quá trình tạo thông tin công ty";
    
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