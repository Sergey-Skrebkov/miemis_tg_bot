import {RequestContext} from "RequestContext";
import {StudentDto} from "./StudentDto";
import {isEmpty} from "lodash";

export class StudentDao {

    constructor(private readonly ctx: RequestContext) {
    }

    public async getStudentByPhoneNumber(phoneNumber: string): Promise<StudentDto> {
        return await this.ctx.db.querySelectOne(`
            select id,
                   chat_id              as "chatId",
                   first_name           as "firstName",
                   middle_name          as "middleName",
                   last_name            as "lastName",
                   login_asu            as login,
                   password_for_sending as password
            from student.student
            where phone_number = $1
               or second_phone_number = $1
        `, [phoneNumber])
    }

    public async deleteStudentPasswordFromDBandSetChatId(id: string): Promise<void> {
        await this.ctx.db.queryOne(`
            update student.student
            set password_for_sending = null,
                chat_id = $2,
                student_take_password = true
            where id = $1
        `, [id, this.ctx.chatId])
    }

    public async checkChatId(chatId: number): Promise<boolean> {
        const row = await this.ctx.db.querySelectOne(`
        select true
        from student.student
        where chat_id = $1
        `, [chatId])
        return !isEmpty(row)
    }

    public async getStudentByChatId(): Promise<StudentDto>{
        return await this.ctx.db.querySelectOne(`
            select id,
                   chat_id              as "chatId",
                   first_name           as "firstName",
                   middle_name          as "middleName",
                   last_name            as "lastName",
                   login_asu            as login,
                   password_for_sending as password
            from student.student
            where chat_id = $1
        `[this.ctx.chatId])
    }
}