import {RequestContext} from "RequestContext";
import {StudentDao} from "./StudentDao";

export class StudentService {
    private readonly studentDao: StudentDao

    constructor(private readonly ctx: RequestContext) {
        this.studentDao = new StudentDao(ctx)
    }

    public async addPhoneToStudent(phoneNumber: string): Promise<void> {
        const student = await this.studentDao.getStudentByPhoneNumber(phoneNumber)
        if(!student) return
        await this.studentDao.setChatIdForStudent(student.id, this.ctx.chatId)
    }

    public async checkCodeFromMessage(messageText: string): Promise<string> {
        const codePattern = new RegExp(/code\s*(\w+)/i)
        const groupEnglishName = codePattern.exec(messageText)[1]

        console.log(groupEnglishName)

        const student = await this.studentDao.getStudentByChatIdAndGroupName(groupEnglishName)

        console.log(student)

        if (!student) {
            return await this.ctx.messageService.getMessage('dontHaveInformationAboutStudent')
        }
        if (!student.password || student.approve) {
            await this.studentDao.setChatIdForStudentByChatId(null, this.ctx.chatId)
            return await this.ctx.messageService.getMessage('dontHaveInformationAboutStudent')
        }
        await this.studentDao.deleteStudentPassword(student.id)
        return await this.ctx.messageService.getMessageWithFormat(
            'sendPassword',
            [student.login, student.password]
        )
    }
}