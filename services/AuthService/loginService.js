const {ErrorHandler} = require('libs');
const {PhantomService} = require('libs');

class LoginService {
    static async loginFromVNU( username, password, res) {
        PhantomService.login(username, password, res)
            .then(result => {
                return result
            })
            .catch(error => {
                throw error
            })
    }
}

module.exports = LoginService