import {Command} from "../Command";
import {Markup, Telegraf} from "telegraf";
import {CustomBotContext} from "CustomBotContext";
import {StudentService} from "../../service/student/StudentService";

export class AcceptContactCommand extends Command {

    constructor(bot: Telegraf<CustomBotContext>) {
        super(bot);
    }

    handle(): void {
        this.bot.on("contact", async (botCtx) => {
            if (!botCtx.ctx.checkedChatId) {
                const contact = botCtx.message.contact;
                const phoneNumber = contact.phone_number;
                const service = new StudentService(botCtx.ctx)
                botCtx.reply(await service.getAuthenticateMessage(phoneNumber),
                    Markup.removeKeyboard())
                return
            }
        })
    }
}