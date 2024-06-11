const authRouter = require('./auth')
const companyRouter = require('./company')
const accountRouter = require('./account')

const api_ver = "/api/v1"
const route = (app) => {
    app.use(`${api_ver}/auth`, authRouter)
    app.use(`${api_ver}/company`, companyRouter)
    app.use(`${api_ver}/account`, accountRouter)
}

module.exports = route;