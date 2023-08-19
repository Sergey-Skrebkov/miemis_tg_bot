import {RequestContext} from "RequestContext";
import {StudentDao} from "./StudentDao";

export class StudentService {
    private readonly studentDao: StudentDao

    constructor(private readonly ctx: RequestContext) {
        this.studentDao = new StudentDao(ctx)
    }

    public async getAuthenticateMessage(phoneNumber: string): Promise<string> {
        const student = await this.studentDao.getStudentByPhoneNumber(phoneNumber)
        if (!student) {
            return await this.ctx.messageService.getMessage('dontHaveInformationAboutStudent')
        }
        if (!student.password || student.chatId) {
            return await this.ctx.messageService.getMessage('passwordSent')
        }
        await this.studentDao.deleteStudentPasswordFromDBandSetChatId(student.id)
        return await this.ctx.messageService.getMessageWithFormat(
            'sendPassword',
            [student.login, student.password]
        )
    }
}