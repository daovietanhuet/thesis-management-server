const {ErrorHandler, PhantomService, CryptoHelper} = require('libs');
const {UsersRepository} = require('repositories');
const jwt = require('jsonwebtoken');

class LoginService {
    static async login(username, password, userRole, clientIp) {
        if(!username || !password) throw ErrorHandler.generateError('username or password is undefined', 400, 'UNDEFINED')
        try{
            let user = await UsersRepository.findOne({
                where:{
                    username,
                    role: userRole
                },
                attributes: ['id', 'role', 'password', 'numberLogin']
            })
            if(!user || !CryptoHelper.comparePassword(password,user.password)) throw ErrorHandler.generateError('username or password is incorrect', 400, 'INVALID')
            else {
                let numberLogin = user.numberLogin + 1;
                await UsersRepository.updateAttributes(user,{numberLogin:numberLogin})
                let data = {
                    id: user.id,
                    role: user.role,
                }
                let token = await jwt.sign({data}, `${clientIp}@${username}@${user.password}@uetthesis`, {expiresIn: '24h'})
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