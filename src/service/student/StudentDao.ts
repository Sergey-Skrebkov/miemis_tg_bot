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
                   password_for_sending as password,
                   approve
            from student.student
            where (phone_number = $1
               or second_phone_number = $1)
               and chat_id is null
        `, [phoneNumber])
    }

    public async deleteStudentPassword(id: string): Promise<void> {
        await this.ctx.db.queryOne(`
            update student.student
            set password_for_sending = null,
                phone_number = null,
                second_phone_number = null,
                approve = true,
                student_take_password = true
            where id = $1
        `, [id])
    }

    public async setChatIdForStudent(id: string, chatId: number) {
        await this.ctx.db.queryOne(`
            update student.student
            set chat_id = $2
            where id = $1
        `, [id, chatId])
    }

    public async setChatIdForStudentByChatId(newChatId: string, chatId: number) {
        await this.ctx.db.queryOne(`
            update student.student
            set chat_id = $2
            where chat_id = $1
        `, [chatId, newChatId])
    }

    public async checkChatId(chatId: number): Promise<boolean> {
        const row = await this.ctx.db.querySelectOne(`
        select true
        from student.student
        where chat_id = $1
        and approve
        `, [chatId])
        return !isEmpty(row)
    }

    public async getStudentByChatId(): Promise<StudentDto> {
        return await this.ctx.db.querySelectOne(`
            select id,
                   chat_id              as "chatId",
                   first_name           as "firstName",
                   middle_name          as "middleName",
                   last_name            as "lastName",
                   login_asu            as login,
                   password_for_sending as password,
                   approve
            from student.student
            where chat_id = $1
        `, [this.ctx.chatId])
    }

    public async getStudentByChatIdAndGroupName(engGroupName: string): Promise<StudentDto> {
        return await this.ctx.db.querySelectOne(`
            select s.id,
                   s.chat_id              as "chatId",
                   s.first_name           as "firstName",
                   s.middle_name          as "middleName",
                   s.last_name            as "lastName",
                   s.login_asu            as login,
                   s.password_for_sending as password,
                   s.approve
            from student.student s
                     join student.student_group g
                          on g.id = s.student_group_id
            where s.chat_id = $1
              and g.english_name = $2
        `, [this.ctx.chatId, engGroupName])
    }
}