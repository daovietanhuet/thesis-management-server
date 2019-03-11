"use strict";
const {ErrorHandler} = require('libs');

module.exports = (userRole, studentRole, lecturerRole, managerRole) => {
    if(typeof userRole !== 'string') throw ErrorHandler.generateError('permission denied', 401, 'PERMISSION DENIED')
    if(!studentRole && userRole === 'STU') throw ErrorHandler.generateError('permission denied', 401, 'PERMISSION DENIED')
    if(!lecturerRole && userRole === 'LEC') throw ErrorHandler.generateError('permission denied', 401, 'PERMISSION DENIED')
    if(!managerRole && userRole === 'MAN') throw ErrorHandler.generateError('permission denied', 401, 'PERMISSION DENIED')
}