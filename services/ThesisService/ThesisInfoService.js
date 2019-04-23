const {ThesesRepository} = require('repositories');
const {Constant} = require('libs');

class ThesisInfoService {
    static async getThesis(userId, userRole, query) {
        let section = query.section;
        let properties = [
            {field: 'id', type: 'integer'},
            {field: 'thesisCode', type: 'string'},
            {field: 'thesisSubject', type: 'string'},
            {field: 'studentId', type: 'integer'}, 
            {field: 'lecturerId', type: 'integer'},
            {field: 'state', type: 'string'},
            {field: 'branch', type: 'string'},
        ]
        let data = {};
        properties.map((ele) => {
            if(query[ele.field]){
                if(ele.type === 'integer') data[ele.field] = parseInt(query[ele.field])
                else data[ele.field] = query[ele.field]
            }
        });
        if(section === 'self' && userRole !== Constant.USER_ROLE.MANAGER) {
            if (userRole === Constant.USER_ROLE.STUDENT) {
                let listThesis = await ThesesRepository.findAll({
                    where: {
                        studentId: userId,
                        ...data
                    }
                })
                return listThesis
            }
            else if (userRole === Constant.USER_ROLE.LECTURER) {
                let listThesis = await ThesesRepository.findAll({
                    where: {
                        lecturerId: userId,
                        ...data
                    },
                    limit: 10
                })
                return listThesis
            }
        } else if ((section === 'all' || !section) && userRole !== Constant.USER_ROLE.MANAGER) {
            let listThesis = await ThesesRepository.findAll({
                where: {
                    ...data
                },
                limit: 10,
                attributes: ['id', 'thesisCode', 'thesisSubject', 'lecturerId', 'state', 'describle', 'university', 'branch', 'created_at', 'updated_at']
            })
            return listThesis
        } else {
            let listThesis = await ThesesRepository.findAll({
                where: {
                    ...data
                },
                limit: 10
            })
            return listThesis
        }
    }
}

module.exports = ThesisInfoService