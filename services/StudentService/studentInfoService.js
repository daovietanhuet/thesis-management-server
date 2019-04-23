const {StudentsRepository} = require('repositories');
const {Constant} = require('libs');

class StudentInfoService {
    static async getStudent(userId, userRole, query) {
        let properties = [
            {field: 'id', type: 'integer'},
            {field: 'fullName', type: 'string'},
            {field: 'gender', type: 'string'},
            {field: 'birthday', type: 'string'}, 
            {field: 'phone', type: 'string'},
            {field: 'email', type: 'string'},
            {field: 'class', type: 'string'},
        ]
        let data = {};

        if(userRole === Constant.USER_ROLE.STUDENT) {
            let student = await StudentsRepository.findOne({
                where: {
                    id: userId
                }
            })
            return student
        } else {
            properties.map((ele) => {
                if(query[ele.field]){
                    if(ele.type === 'integer') data[ele.field] = parseInt(query[ele.field])
                    else data[ele.field] = query[ele.field]
                }
            });
            let listStudent = await StudentsRepository.findAll({
                where: {
                    ...data
                }
            })
            return listStudent
        }
    }
}

module.exports = StudentInfoService