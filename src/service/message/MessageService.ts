import {MessageDao} from "./MessageDao";
import {RequestContext} from "RequestContext";
import {stringFormat} from "../../functions/stringFormat";

export class MessageService{
    private readonly messageDao: MessageDao

    constructor(ctx: RequestContext) {
        this.messageDao = new MessageDao(ctx)
    }

    public async getMessage(messageName: string): Promise<string> {
        const message = await this.messageDao.getMessageByName(messageName)
        return message.text
    }

    public async getMessageWithFormat(messageName: string, arrayArg: string[]): Promise<string> {
        const message = await this.messageDao.getMessageByName(messageName)
        return stringFormat(message.text, arrayArg)
    }
}