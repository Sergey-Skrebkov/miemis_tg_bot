import {Command} from "../Command";
import {Telegraf} from "telegraf";
import {CustomBotContext} from "CustomBotContext";
import {startInlineKeyboard} from "../../telegramElements/startInlineKeyboard";
import {startKeyboardForAuthChat} from "../../telegramElements/startKeyboardForAuthChat";

export class StartCommand extends Command {
    constructor(bot: Telegraf<CustomBotContext>) {
        super(bot);
    }

    handle(): void {
        this.bot.start(async (botCtx: CustomBotContext) => {
            if (!botCtx.ctx.checkedChatId) {
                botCtx.reply(
                    await botCtx.ctx.messageService.getMessage
                    ('startMessageFotNotAuthUsers'),
                    startInlineKeyboard())
                return
            }
            botCtx.reply(
                await botCtx.ctx.messageService.getMessage
                ('startMessageFotAuthUsers'),
                    startKeyboardForAuthChat().oneTime().resize()
            )

        })
    }


}