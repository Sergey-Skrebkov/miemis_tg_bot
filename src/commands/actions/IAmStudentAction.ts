import {Command} from "../Command";
import {Telegraf} from "telegraf";
import {CustomBotContext} from "CustomBotContext";
import {sendContactKeyboard} from "../../telegramElements/sendContactKeyboard";

export class IAmStudentAction extends Command {

    constructor(bot: Telegraf<CustomBotContext>) {
        super(bot);
    }

    handle(): void {
        this.bot.action("i_am_miemis_student", async (botCtx: CustomBotContext) => {
            if (!botCtx.ctx.checkedChatId) {
                botCtx.reply(
                    await botCtx.ctx.messageService.getMessage
                    ('iAmMiemisStudent'),
                    sendContactKeyboard().oneTime().resize())
            }
        })
    }
}