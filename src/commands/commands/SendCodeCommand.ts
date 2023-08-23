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
        //Регулярка ищит название группы в сообщение
        this.bot.hears(/^2\.\d{3}?(?:-\d)?[ми]?$/i, async (botCtx) =>{
            if(botCtx.ctx.checkedChatId) throw new ResponseError()
            const messageText = botCtx.message.text
            const service = new StudentService(botCtx.ctx)
            botCtx.reply( await service.checkCodeFromMessage(messageText))
        })
    }
}