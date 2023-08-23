import {Command} from "../Command";
import {Markup, Telegraf} from "telegraf";
import {CustomBotContext} from "CustomBotContext";
import {StudentService} from "../../service/student/StudentService";
import {ResponseError} from "../../exceptions/ResponseError";

export class AcceptContactCommand extends Command {

    constructor(bot: Telegraf<CustomBotContext>) {
        super(bot);
    }

    handle(): void {
        this.bot.on("contact", async (botCtx) => {
            if (botCtx.ctx.checkedChatId) throw new ResponseError()
            const contact = botCtx.message.contact;
            const phoneNumber = contact.phone_number;
            console.log(phoneNumber)
            const service = new StudentService(botCtx.ctx)
            await service.addPhoneToStudent(phoneNumber)
            botCtx.reply(await botCtx.ctx.messageService.getMessage('sendCode'),
                Markup.removeKeyboard())
            return
        })
    }
}