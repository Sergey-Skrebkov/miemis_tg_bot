import {Command} from "../Command";
import {Telegraf} from "telegraf";
import {CustomBotContext} from "CustomBotContext";
import {startInlineKeyboard} from "../../telegramElements/startInlineKeyboard";

export class StartCommand extends Command {
    constructor(bot: Telegraf<CustomBotContext>) {
        super(bot);
    }

    handle(): void {
        this.bot.start(async (botCtx) => {
            if (!botCtx.ctx.checkedChatId) {
                botCtx.reply(
                    "Привет, я телеграм бот МИЭМИ. " +
                    "Я создан для помощи студентам МИЭМИС. " +
                    "Для начала ответь на мой вопрос. " +
                    "Являешься ли ты студентом МИЭМИС?"
                    , startInlineKeyboard())
                return
            }
            botCtx.reply(
                "Привет, я телеграм бот МИЭМИС. " +
                "Я создан для помощи студентам МИЭМИС.",
            )
        })
    }


}