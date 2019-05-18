const {LecturersRepository, ThesesRepository} = require('repositories');
const {Constant} = require('libs');

class lecturerInfoService {
    static async getLecturer(userId, userRole, query) {
        let properties = [
            {field: 'id', type: 'integer'},
            {field: 'fullName', type: 'string'},
            {field: 'birthday', type: 'string'}, 
            {field: 'phone', type: 'string'},
            {field: 'email', type: 'string'},
            {field: 'branch', type: 'string'},
        ]
        let data = {};

        if(userRole === Constant.USER_ROLE.LECTURER && query.section === 'self') {
            let Lecturer = await LecturersRepository.findOne({
                where: {
                    userId: userId
                }
            })
            return Lecturer
        } else {
            properties.map((ele) => {
                if(query[ele.field]){
                    if(ele.type === 'integer') data[ele.field] = parseInt(query[ele.field])
                    else data[ele.field] = query[ele.field]
                }
            });
            let listLecturer = await LecturersRepository.findAll({
                where: {
                    ...data
                },
                raw: true
            })
            for(let i = 0; i < listLecturer.length; i++) {
                let thesis = await ThesesRepository.findAll({
                    where: {
                        lecturerId: listLecturer[i].id
                    }
                })
                listLecturer[i].thesis = thesis
            }
            return listLecturer
        }
    }
}

module.exports = lecturerInfoService