import {RequestContext} from "RequestContext";
import {MessageDto} from "./MessageDto";

export class MessageDao{

    constructor(private readonly ctx: RequestContext) {
    }

    public async getMessageByName(name: string): Promise<MessageDto> {
        return await this.ctx.db.querySelectOne(`
            select message_name as name,
                   message_text as text
            from bot.message
            where message_name = $1
        `, [name])
    }
}