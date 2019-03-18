const {LecturerThesisService} = require('services');
const {ErrorHandler} = require('libs');
const {verifyToken, verifyRole} = require('middlewares');

class lecturerThesis {
    constructor() {
      if (!lecturerThesis.instance) {
        lecturerThesis.instance = this;
      }
  
      return lecturerThesis.instance;
    }
    //end constructor
  
    registerRoute(router) {
      return router
        .post('/lecturer/thesis/create', verifyToken, this.createThesis)
        .post('/lecturer/thesis/accept/:thesisId', verifyToken, this.acceptThesis)
        .post('/lecturer/thesis/reject/:thesisId', verifyToken, this.rejectThesis)
    }

    createThesis(req, res, next) {
        let {userId, userRole} = req;
        verifyRole(userRole, false, true, false);
        LecturerThesisService.createThesis(userId, req.body)
          .then(result => {
            res.status(200).json({result, httpCode:200})
          })
          .catch(error => {
            next(ErrorHandler.createErrorWithFailures(error.message, error.httpCode || 500, error.name || 'SERVER_ERROR', error.failures))
          })
    }

    acceptThesis(req, res, next) {
        let {userId, userRole} = req;
        let thesisId = req.params.thesisId;
        verifyRole(userRole, false, true, false);
        LecturerThesisService.acceptThesis(userId, thesisId)
          .then(result => {
            res.status(200).json({result, httpCode:200})
          })
          .catch(error => {
            next(ErrorHandler.createErrorWithFailures(error.message, error.httpCode || 500, error.name || 'SERVER_ERROR', error.failures))
          })
    }

    rejectThesis(req, res, next) {
      let {userId, userRole} = req;
      let thesisId = req.params.thesisId;
      verifyRole(userRole, false, true, false);
      LecturerThesisService.rejectThesis(userId, thesisId)
        .then(result => {
          res.status(200).json({result, httpCode:200})
        })
        .catch(error => {
          next(ErrorHandler.createErrorWithFailures(error.message, error.httpCode || 500, error.name || 'SERVER_ERROR', error.failures))
        })
  }
}

let instance = new lecturerThesis();
Object.freeze(instance);

module.exports = instance;
