const {LecturersRepository, ThesesRepository, ActivitiesRepository} = require('repositories');
const {ErrorHandler, Constant} = require('libs');

class LecturerThesisService {
    static async createThesis(userId, thesisData) {
        try{
            let lecturer = await LecturersRepository.findOne({
                where: {userId}
            })
            if(!lecturer) throw ErrorHandler.generateError('lecturer not found', 404, 'NOT FOUND');

            let thesis = {}
            let requiredFieldName = {thesisCode:'1',thesisSubject:'2',describle:'3',university:'4',branch:'5'}
            if(!thesisData) throw ErrorHandler.generateError('thesis is undefined', 400, 'UNDEFINED')
            for(let fieldName in requiredFieldName){
                if(!thesisData[fieldName]) throw ErrorHandler.generateError(`${fieldName} is undefined`, 400, 'UNDEFINED')
                else thesis[fieldName] = thesisData[fieldName]
            }

            let numberThesisCode = await ThesesRepository.count({where: {thesisCode: thesis.thesisCode}})
            if(numberThesisCode > 0) throw ErrorHandler.generateError('thesis code is duplicated', 400, 'DUPLICATED')
            let numberLecturerThesis = await ThesesRepository.count({where: {lecturerId: lecturer.id, state: Constant.THESIS_STATE.NEW}})
            if(numberLecturerThesis > 15) throw ErrorHandler.generateError('number of thesis limited', 500, 'LIMITED')

            let resultThesis = await ThesesRepository.create({
                lecturerId: lecturer.id,
                ...thesis,
                state: Constant.THESIS_STATE.NEW,
                isCompleted: false,
                isCancel: false
            })
            if(!resultThesis) throw ErrorHandler.generateError('unknown error', 500, 'UNKNOWN')
            else {
                await ActivitiesRepository.create({
                    userId,
                    content: 'tạo khóa luận mới',
                    state: Constant.ACTIVITY_STATE.LOGGING,
                    creatorId: userId
                })
                let numberNewActivity = lecturer.numberNewActivity + 1
                await LecturersRepository.updateAttributes(lecturer, {numberNewActivity})
                return resultThesis
            }
        } catch (error) {
            throw error
        }
    }
}

module.exports = LecturerThesisService