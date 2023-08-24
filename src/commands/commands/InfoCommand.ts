import {Command} from "../Command";
import {Telegraf} from "telegraf";
import {CustomBotContext} from "CustomBotContext";

export class InfoCommand extends Command {

    constructor(bot: Telegraf<CustomBotContext>) {
        super(bot);
    }

    handle(): void {
        this.bot.command('info', async (botCtx) => {
            if (botCtx.ctx.checkedChatId) {
                await botCtx.reply(await botCtx.ctx.messageService.getMessage('infoForStudents'))
            } else {
                await botCtx.reply(await botCtx.ctx.messageService.getMessage('commonInfo'))
            }
        })
    }


}