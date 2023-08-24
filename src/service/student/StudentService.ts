import {RequestContext} from "RequestContext";
import {StudentDao} from "./StudentDao";
import process from "process";
import bcrypt from 'bcrypt'

export class StudentService {
    private readonly studentDao: StudentDao

    constructor(private readonly ctx: RequestContext) {
        this.studentDao = new StudentDao(ctx)
    }

    public async addPhoneToStudent(phoneNumber: string): Promise<void> {
        const {BCRIPT_SALT} = process.env
        phoneNumber = await bcrypt.hash(phoneNumber, BCRIPT_SALT)
        const student = await this.studentDao.getStudentByPhoneNumber(phoneNumber)
        if (!student) return
        await this.studentDao.setChatIdForStudent(student.id, this.ctx.chatId)
    }

    public async checkCodeFromMessage(messageText: string): Promise<string> {
        messageText.toLowerCase()
        const student = await this.studentDao.getStudentByChatIdAndGroupName(messageText)
        if (!student) {
            return await this.ctx.messageService.getMessage('dontHaveInformationAboutStudent')
        }
        if (!student.password || student.approve) {
            return await this.ctx.messageService.getMessage('dontHaveInformationAboutStudent')
        }
        await this.studentDao.deleteStudentPassword(student.id)
        return await this.ctx.messageService.getMessageWithFormat(
            'sendPassword',
            [student.login, student.password]
        )
    }
}