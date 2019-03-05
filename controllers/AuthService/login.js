const {LoginService} = require('services');
const {ErrorHandler} = require('libs');

class Login {
    constructor() {
      if (!Login.instance) {
        Login.instance = this;
      }
  
      return Login.instance;
    }
    //end constructor
  
    registerRoute(router) {
      return router
        .post('/auth/login', this.login)
        .post('/auth/async/login', this.loginFromVNU)
    }

    login(req, res, next) {
        let {username, password} = req.body;
        LoginService.login(username, password)
          .then(result => {
            res.status(200).json({result, httpCode:200})
          })
          .catch(error => {
            next(ErrorHandler.createErrorWithFailures(error.message, error.httpCode || 500, error.name || 'SERVER_ERROR', error.failures))
          })
    }

    loginFromVNU(req, res, next) {
        let {username, password} = req.body;
        LoginService.loginFromVNU(username, password, res)
          .catch(error => {
            next(ErrorHandler.createErrorWithFailures(error.message, error.httpCode || 500, error.name || 'SERVER_ERROR', error.failures))
          })
    }
}

let instance = new Login();
Object.freeze(instance);

module.exports = instance;
