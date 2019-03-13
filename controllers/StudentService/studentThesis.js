const {StudentThesisService} = require('services');
const {ErrorHandler} = require('libs');
const {verifyToken, verifyRole} = require('middlewares');

class studentThesis {
    constructor() {
      if (!studentThesis.instance) {
        studentThesis.instance = this;
      }
  
      return studentThesis.instance;
    }
    //end constructor
  
    registerRoute(router) {
      return router
        .post('/student/thesis/:thesisId', verifyToken, this.joinThesis)
    }

    joinThesis(req, res, next) {
        let {userId, userRole} = req;
        let thesisId = req.params.thesisId;
        verifyRole(userRole, true, false, false);
        StudentThesisService.joinThesis(userId, thesisId)
          .then(result => {
            res.status(200).json({result, httpCode:200})
          })
          .catch(error => {
            next(ErrorHandler.createErrorWithFailures(error.message, error.httpCode || 500, error.name || 'SERVER_ERROR', error.failures))
          })
    }
}

let instance = new studentThesis();
Object.freeze(instance);

module.exports = instance;
