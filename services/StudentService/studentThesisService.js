const {StudentsRepository, ThesesRepository, ActivitiesRepository, LecturersRepository} = require('repositories');
const {ErrorHandler, Constant} = require('libs');

class StudentThesisService {
    static async joinThesis(userId, thesisId) {
        let student = StudentsRepository.findOne({
            where: {userId}
        });
        let thesis = ThesesRepository.findOne({
            where: {
                id: thesisId,
                state: Constant.THESIS_STATE.NEW
            }
        });
        let result = await Promise.all([student, thesis]);
        student = result[0]; thesis = result[1];
        if(!student) throw ErrorHandler.generateError('student not found', 404, 'NOT FOUND');
        if(!thesis) throw ErrorHandler.generateError('thesis not found or not new', 400, 'NOT FOUND');

        let numberJoinedThesis = ThesesRepository.count({
            where: {studentId: student.id}
        }); 
        let numberJoinedThesisOfLecturer = ThesesRepository.count({
            where: {lecturerId: thesis.lecturerId, state: Constant.THESIS_STATE.ACTIVE}
        }); 
        result = await Promise.all([numberJoinedThesis, numberJoinedThesisOfLecturer])
        numberJoinedThesis = result[0]; numberJoinedThesisOfLecturer = result[1]
        if(numberJoinedThesis > 0) throw ErrorHandler.generateError('number of joined thesis limited', 500, 'LIMITED');
        if(numberJoinedThesisOfLecturer >= 5) throw ErrorHandler.generateError('number of joined thesis limited', 500, 'LIMITED');

        let thesisUpdate = await ThesesRepository.updateAttributes(thesis, {
            studentId: student.id,
            state: Constant.THESIS_STATE.WAITTING,
        })
        if(!thesisUpdate) throw ErrorHandler.generateError('unknown error', 500, 'UNKNOWN');
        else {
            let lecturer = await LecturersRepository.findOne({where: {id: thesisUpdate.lecturerId}})
            let createActivity = ActivitiesRepository.create({
                userId: lecturer.userId,
                content: 'đăng ký khóa luận',
                state: Constant.ACTIVITY_STATE.LOGGING,
                creatorId: userId
            })
            let numberNewActivity = student.numberNewActivity + 1
            let updateActivityStudent =  StudentsRepository.updateAttributes(student, {numberNewActivity})
            let numberNewActivityLecturer = lecturer.numberNewActivity + 1
            let updateActivityLecturer = LecturersRepository.updateAttributes(lecturer, {numberNewActivityLecturer})
            await Promise.all([createActivity, updateActivityStudent, updateActivityLecturer])
            return thesisUpdate
        }
    }
}

module.exports = StudentThesisService