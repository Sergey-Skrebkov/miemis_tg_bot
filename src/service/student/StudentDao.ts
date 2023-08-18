import {RequestContext} from "RequestContext";
import {StudentDto} from "./StudentDto";

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

    public async deleteStudentPasswordFromDB(id: string): Promise<void> {
        await this.ctx.db.queryOne(`
            update student.student
            set password_for_sending = null
            where id = $1
        `, [id])
    }
}