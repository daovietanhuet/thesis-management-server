const {ErrorHandler} = require('libs');
const {PhantomService} = require('libs');
const {UsersRepository} = require('repositories');
const jwt = require('jsonwebtoken');

class LoginService {
    static async login(username, password, clientIp) {
        if(!username || !password) throw ErrorHandler.generateError('username or password is undefine', 400, 'UNDEFINE')
        try{
            let user = await UsersRepository.findOne({
                where:{
                    username,
                    password
                },
                attributes: ['id','role']
            })
            if(!user) throw ErrorHandler.generateError('user not found', 404, 'NOT FOUND')
            else {
                await UsersRepository.updateAttributes(user,{isLogin:true})
                let data = {
                    id: user.id,
                    role: user.role,
                }
                let token = await jwt.sign({data}, `${clientIp}@${username}@${password}@uetthesis`, {expiresIn: '24h'})
                return {token}
            }
        } catch (error) {
            throw error
        }
    }

    static async loginFromVNU(username, password, res) {
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