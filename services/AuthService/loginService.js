const {ErrorHandler} = require('libs');
const {VNUSystemClient} = require('clients')

class LoginService {
    static async loginFromVNU( username, password ) {
        const body = {
            chkSubmit: "ok",
            txtSel: 2,
            txtLoginId: username,
            txtPassword: password
        }
        const headers = {
            "Content-Type":'application/x-www-form-urlencoded'
        }
        let result = await VNUSystemClient.request('/dkmh/login.asp', 'POST', body, headers)
        return result
    }
}

module.exports = LoginService