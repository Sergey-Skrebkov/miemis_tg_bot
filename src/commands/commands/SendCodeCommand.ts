import {Command} from "../Command";
import {Telegraf} from "telegraf";
import {CustomBotContext} from "CustomBotContext";
import {StudentService} from "../../service/student/StudentService";
import {ResponseError} from "../../exceptions/ResponseError";

export class SendCodeCommand extends Command{

    constructor(bot: Telegraf<CustomBotContext>) {
        super(bot);
    }

    handle(): void {
        this.bot.hears(/code/i, async (botCtx) =>{
            if(botCtx.ctx.checkedChatId) throw new ResponseError()
            const messageText = botCtx.message.text
            const service = new StudentService(botCtx.ctx)
            botCtx.reply( await service.checkCodeFromMessage(messageText))
        })
    }
}