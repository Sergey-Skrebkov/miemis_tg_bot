import {Command} from "../Command";
import {Telegraf} from "telegraf";
import {CustomBotContext} from "CustomBotContext";

export class IAmNotStudentAction extends Command {
    constructor(bot: Telegraf<CustomBotContext>) {
        super(bot);
    }

    handle(): void {
        this.bot.action("i_am_not_miemis_student", async (botCtx: CustomBotContext) => {
            botCtx.reply(
                await botCtx.ctx.messageService.getMessage
                ('iAmNotMiemisStudent'))
        })
    }
}