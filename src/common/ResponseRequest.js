const HandleErrorCode = require("./HandleError")

const SuccessResponse = (data) => {
    return {
        status: true,
        result: data
    }
}

const FailureResponse = (errorCode, error) => {
    return {
        status: false,
        message: HandleErrorCode(errorCode),
        error: error
    }
}

module.exports = {SuccessResponse, FailureResponse}