import {RequestContext} from "RequestContext";
import {StudentDao} from "./StudentDao";

export class StudentService {
    private readonly studentDao: StudentDao

    constructor(ctx: RequestContext) {
        this.studentDao = new StudentDao(ctx)
    }

    public async getAuthenticateMessage(phoneNumber: string): Promise<string> {
        const student = await this.studentDao.getStudentByPhoneNumber(phoneNumber)
        if (!student) {
            return `Ваших учетные данные не представленны в системе,
            если вы являетись студентом МИЭМИС, 
            просим вас обратится в техническую поддержку МИЭМИС`
        }
        if (!student.password || student.chatId) {
            return `Вы уже получили пароль`
        }
        await this.studentDao.deleteStudentPasswordFromDB(student.id)
        return `Поздравляем вас с поступление в МИЭМИС
        ваш логин: ${student.login}
        пароль: ${student.password}.
        Просим вас зайти в личный кабинет студента
        на сайте lk.asu.ru
        `
    }
}