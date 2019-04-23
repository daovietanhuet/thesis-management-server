'use strict';
const {UsersRepository} = require('repositories');
const {ErrorHandler} = require('libs');
const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    const bearerHeader = req.headers['authorization'];
    if(typeof bearerHeader !== undefined){
        try{
            const bearer = bearerHeader.split(" ");
            const bearerToken = bearer[1];
            const decoded = jwt.decode(bearerToken);
            UsersRepository.findOne({
                where:{id:decoded.data.id},
                attributes:['password','username']
            })
            .then (user => {
                jwt.verify(bearerToken, `${req.connection.remoteAddress}@${user.username}@${user.password}@uetthesis`, (error, result)=>{
                    if(result){
                        req.userId = result.data.id
                        req.userRole = result.data.role
                        next()
                    } else if (error) {
                        next(ErrorHandler.generateError('permission denied', 401, 'PERMISSION DENIED'))
                    }
                })
            })
        } catch (error) {
            throw ErrorHandler.generateError('permission denied', 401, 'PERMISSION DENIED')
        }
    } else {
        res.sendStatus(403)
    }
}